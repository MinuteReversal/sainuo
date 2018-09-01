<template>
    <el-container v-show="isLogin" class="index-page">
        <el-aside class="left-menu" width="auto">
            <main-logo v-model="isCollapse"/>
            <div class="menu">
                <el-menu class="el-menu-vertical" 
                    :default-active="menuIndex" 
                    ref="elMenu" 
                    :collapse="isCollapse" 
                    background-color="#001529" 
                    text-color="#a5acb3" 
                    active-text-color="#ffd04b"
                >
                    <template v-if="leftMenus.length && typeof menu.items.length === 'number'" v-for="(menu,i) in leftMenus"  >
                        <el-submenu v-if="menu.items.length" :index="i.toString()" :key="i">
                            <template slot="title">
                                <i :class="[menu.icon]"></i>
                                <span slot="title">{{menu.name}}</span>
                            </template>
                            <el-menu-item v-for="(child,j) in menu.items" :index="i+'-'+j" :key="j" @click="nav(child)">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="i.toString()" :key="i" @click="nav(menu)">
                            <i :class="[menu.icon]"></i>
                            <template slot="title">
                                <span slot="title">{{menu.name}}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>    
        </el-aside>
        <el-container class="main-content">        
            <el-header class="main-head">
                <span class="margin-right-xl">
                    <biz-expand-button v-model="isCollapse" right />
                </span>
                <span class="nav-menu">
                    <el-tabs v-model="navIndex" @tab-click="handleTabClick">
                        <el-tab-pane :name="index.toString()" v-for="(nav,index) in topNavigation" :key="index" >
                            <span slot="label" class="padding-left-right-xl"><i :class="[nav.icon]" class="margin-right-m"></i>{{nav.name}}</span>
                        </el-tab-pane>
                     </el-tabs>
                </span>
                <span class="blank"></span>
                <top-user-name />
            </el-header>
            <el-main class="sub-page">
                <nuxt-child/>
            </el-main>
        </el-container >
    </el-container>
</template>
<script>
import webConfig from "~/static/webConfig"
import apiConfig from "~/static/apiConfig"
import MainLogo from "~/components/MainLogo.vue"
import BizExpandButton from "~/components/BizExpandButton.vue"
import ThemePicker from "~/components/theme-picker.vue"
import TopUserName from "~/components/TopUserName"
import axios from "axios"
import { mapGetters,mapActions } from "vuex"

export default {
    computed: {
        ...mapGetters("modules/user",[
            "information",
            "menus",
            "permissions"            
        ]),
        isLogin() {
            return !!this.information;
        },
        topNavigation() {
            if(this.menus instanceof Array){
                return this.menus[0].items;
            }
            return [];
        },
        leftMenus(){
            if(this.selectedIndex !== ""){
                return this.topNavigation[parseInt(this.selectedIndex)].items;
            }
            else{
                return [];
            }
        }
    },
    components: {
        MainLogo,
        BizExpandButton,
        ThemePicker,
        TopUserName
    },
    data() {
        return {            
            isCollapse:false,
            navIndex:"0",    //顶部菜单默认选中
            menuIndex: "0-0",//左则菜单默认选中
            selectedIndex:""
        };
    },
    beforeMount(){        
        let me = this;
        if(me.$store.getters["modules/user/information"] === null){
            me.$router.replace("/login");
        }
    },
    mounted() {
        let me = this;
        if(!me.isLogin){
            me.$message({type:'error',message:"您没有登录！"});
            me.$router.replace("login");
        }
        else
        {
            me.defaultSelect();        
        }
    },
    watch:{
        "$route"(to,from){
            //this.defaultSelect();
        }
    },
    methods: {
        ...mapActions("modules/user",[
            "restore",
            "save"
        ]),
        handleTabClick(x){
            this.selectedIndex = x.index;
        },
        defaultSelect(){
            let me = this;
            //直接进入主页面
            if(me.$route.path==="/"){
                me.navToFirst();
            }else{//进入子页面
                me.navToSubPage();
            }
        },
        navToFirst(){
            let me = this;
            let path = me.getFirstPath(me.menus,0,"items");
            if(path.length>1){
                me.selectedIndex = "0";
            }
            let last = path[path.length-1].menu;
            if(last && typeof last.url==="string" && last.url!=="#" && last.url!==""){
                me.nav(last);
            }
        },
        navToSubPage(){
            let me = this;
            var ps=me.$route.path.split('/');ps.pop();
            let ppath=ps.join('/');
            let path = me.getMenuPath(me.$route.path,me.menus,0,"url","items");
            path=path.length?path:me.getMenuPath(ppath,me.menus,0,"url","items");
            if(path.length){
                me.selectedIndex = me.topNavigation.indexOf(path[1].menu).toString();
                me.navIndex = path[1].index.toString();//跳过第一层
                path.shift();path.shift();
                me.menuIndex = path.map(p=>p.index).join("-");
            }
        },
        nav(model){
            if(typeof model.url==="string" && model.url!=="#" && model.url!==""){
                this.$router.push(model.url);
            }
        },
        //递归菜单路径
        getMenuPath (url, menus,level,pathField,childrenField) {
            var me = this;
            var path = [];
            for (var i = 0, m; m = menus[i];i++) {
                
                if(me.testEqual(m[pathField],url)){
                    path.push({
                        index:i,
                        level:level,
                        menu:m,
                    });
                }

                if(m[childrenField].length){
                    let ps = me.getMenuPath(url,m[childrenField],level + 1,pathField,childrenField);
                    if(ps.length){
                        path = path.concat([
                            {
                                index:i,
                                level:level,
                                menu:m,
                            }
                        ],ps);
                    }
                }
            }
            return path;
        },
        //获取第一级的叶子路径
        getFirstPath(menus,level,childrenField){
            var me = this;
            var path = [];
            for(var i=0,menu;menu = menus[i];i++){
                if(i===0){
                    path.push({
                        index:i,
                        level:level,
                        menu:menu
                    });

                    if(menu[childrenField].length){
                        path = path.concat(me.getFirstPath(menu[childrenField],level+1,childrenField));
                    }
                }
            }
            return path;
        },
        testEqual(a,b){
            if(typeof a === "string" && typeof b==="string"){
                return this.removeLastSlash(a)===this.removeLastSlash(b);
            }
            return false;
        },
        removeLastSlash(txt){
            return txt[txt.length-1]==="/" ? txt.slice(0,-1):txt;
        }
    }
}
</script>
<style lang="scss">
.index-page {
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;



    .left-menu {
        display: flex;
        flex-direction: column;
        background-color: #001529;
        
        .main-logo {
            flex: none;
        }        
    }

    .el-menu {
        border-right: 0;
    }

    /*左侧菜单默认宽度*/
    .el-menu-vertical:not(.el-menu--collapse) {
        flex: auto;        
        width: 240px;
    }

    /*设置font-awesome在左侧菜单中的表现*/
    .el-menu-item [class^=fa],
    .el-submenu [class^=fa]{
            vertical-align: middle;
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 18px;
    }

    .main-head {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 21, 41, 1);

        .blank {
            flex: auto;
        }

        .nav-menu {
            .el-tabs__active-bar {
                background-color:#ffd04b;
            }

            .el-tabs__nav-wrap::after {
                background-color: #001529;
            }

            .el-tabs__item {
                $h:60px - 1px;
                height:$h;
                line-height:$h;
                color: #a5acb3;

                &.is-active {
                    color:#ffd04b;
                }

            }

            .el-tabs__header{
                margin: 0;
            }
        }
    }

    .el-main {
        padding: 0;
    }
}
</style>