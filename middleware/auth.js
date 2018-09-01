import { getUserAuthorizationFromCookie,getUserFromLocalStorage } from '~/utils/auth'
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import cookie from "js-cookie"

export default async (context) => { 
    console.log("auth");
    //服务端
    if (process.server){
        const authorization = getUserAuthorizationFromCookie(context.req);//从cookie还原会话
        if(!authorization){
            context.redirect("/login");
            return;
        }
        const instance = axios.create({            
            headers: {'authorization':authorization}
        });
        const user = await instance.post(apiConfig.session_get);
        const menus = await instance.get(apiConfig.menu_my_tree_get);
        const permissons = await instance.get(apiConfig.user_permission_get);        

        const u = {
            information: user.data.result,//用户信息
            menus: menus.data.result,        //菜单
            permissions: permissons.data.result,  //权限
            timer: null       //时钟id
        };

        if(u)context.store.commit("modules/user/restore", u);
    }

    //客户端
    else if(process.client){
        //客户端不关心是否有cookie
        const user = getUserFromLocalStorage();      
        if (user){
            //直接还原用户
            if(!axios.defaults.headers.common["authorization"]){
                axios.defaults.headers.common["authorization"] = user.authorization;
            }
            
            if(context.store.getters["modules/user/information"] === null){      
                context.store.commit("modules/user/restore", user);//还原会话
            }
        }
        else {
            if(context.route.path!="/login"){
                window.location.replace("/login");
            }
        }
    }
}