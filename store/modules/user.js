/**
 * @author:zhy
 * @date :20180628
 * @description 用户业务状态
 */
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import cookie from "js-cookie"


//https://github.com/axios/axios
//加载用户的权限
const loadPermission = () => {
    return axios.get(apiConfig.user_permission_get);
};

// 加载用户的菜单
const loadMenu = () => {
    return axios.get(apiConfig.menu_my_tree_get);
}

//加载用户信息
const loadUser = () => {
    return axios.post(apiConfig.session_get);
}

const state = () => ({
    model: {
        information: null,//用户信息
        menus: null,        //菜单
        permissions: null,  //权限
        authorization:"", 
        timer: null       //时钟id
    }
})

// getters
const getters = {
    information: state => state.model.information,
    menus: state => state.model.menus,
    permissions: state => state.model.permissions,
    permissionsContains: state => value => {
        return !!state.model.permissions.find(x => x === value);
    }
}

// actions
const actions = {
    async login({ commit, dispatch }, model) {
        let response = await axios.post(apiConfig.user_login, model.data);
        commit("onOnline");  //让客户端保持在线
        let authorization = `Bearer ${response.data.result}`;
        try{
            await dispatch("loadUser", authorization);
            if(model.callback)model.callback(true);
        }
        catch(ex){
            if(model.callback)model.callback(false);
        }
    },
    async loadUser({ commit }, authorization) {

        //修改全局请求头
        commit("setAuthorization", authorization);
        //同步用户、菜单、权限到客户端
        
        let user = await loadUser();
        let menus = await loadMenu();
        let permissions = await loadPermission();

        commit("setInformation", user.data.result);
        commit("setMenus", menus.data.result);
        commit("setPermissions", permissions.data.result);
        commit("save");
    },
    logout({ commit }) {
        commit("onLogout");
    }
}

// mutations
const mutations = {
    //保持在线
    onOnline(state) {
        if (state.timer === null) {
            state.timer = setInterval(() => {
                axios.get(apiConfig.ping);
            }, 15 * 60 * 1000);
        }
    },
    save(state) {
        window.localStorage["user"] = JSON.stringify(state.model);
    },
    //还原会话
    restore(state, user) {
        if (user) {
            state.model = user;
        }
    },
    //退出在线
    onOffline(state) {
        clearInterval(state.timer);
        state.model.timer = null;
    },
    setInformation(state, information) {
        state.model.information = information;
    },
    setMenus(state, menus) {
        state.model.menus = menus;
    },
    setPermissions(state, permissions) {
        state.model.permissions = permissions;
    },
    setAuthorization(state, authorization) {
        axios.defaults.headers.common["authorization"] = authorization;
        state.model.authorization = authorization;
        cookie.set("authorization", authorization);
    },
    /**
     * 用户退出登录     
     */
    onLogout(state) {
        axios.defaults.headers.common["authorization"] = undefined;
        cookie.remove("authorization");
        state.commit("onOffline");
        localStorage.clear();
        state.model = {
            information: null,//用户信息
            menus: null,        //菜单
            permissions: null,  //权限
            timer: null,      //时钟id
            authorization:""
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}