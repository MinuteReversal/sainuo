<template>
    <div class="top-user-name">
        <nav class="color-white">
            <div class="padding-left-right-xl">
                <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link color-white">
                        <span>
                            <img class="avatar" src="~/static/images/avatar.jpg" />
                        </span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="ChangePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="a">修改资料</el-dropdown-item>
                        <el-dropdown-item command="Exit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters,mapActions }  from "vuex"
export default {
    computed:{
        ...mapGetters("modules/user",[
            "information",
            "menus",
            "permissions"            
        ]),
        userName(){
            if(this.information){
                return this.information.user.name;
            }
            return ""
        }
    },
    methods:{
        handleCommand (command) {
            var me=this;
            switch (command) {
                case "ChangePassword":
                    me.$loaderwindow("/usercenter/changepassword",'修改密码');
                    break;
                case "Exit":
                    me.$confirm('确定退出登录？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=> {
                        me.$router.replace("/login");                        
                        me.$store.dispatch("logout");
                    }).catch(()=> {

                    });
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
.top-user-name {
    display: inline-block;

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
    }

}
</style>
