<template>
 <div class="login-page">
        <div class="login">
            <el-form :model="form" :rules="rules" ref="form" label-position="top">
                <header class="text-align-center">
                    <logo/>
                </header>
                <div>
                   <el-tabs v-model="activeTab">
                    <el-tab-pane  label="账户密码登录" name="account">
                      <el-form-item label="帐号" prop="username">
                          <el-input v-model="form.username"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="passwords">
                          <el-input type="password" v-model="form.passwords" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-checkbox v-model="form.isRemember">记住密码</el-checkbox>
                      </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="手机号登录" name="phone">
                       <el-form-item label="手机号" prop="username">
                          <el-input v-model="form.username"></el-input>
                      </el-form-item>
                      <el-form-item label="验证码" prop="passwords">
                          <el-input type="password" v-model="form.passwords" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <div>
                  <el-button type="primary" @keydown.13="login" @click="login" class="col-12" :loading="loading">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import webConfig from "~/static/webConfig"
import apiConfig from "~/static/apiConfig"
import md5 from "~/static/javascript/md5"
import logo from "~/components/Logo.vue"
export default {
    components:{
        'logo':logo
    },
    data:()=>({
        activeTab:"account",
        loading: false,
        rules: {
            username: [
            { required: true, message: "请输入账号", trigger: "blur" },
            { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
            ],
            passwords: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
            ]
        },
        form: {
            username: "admin",
            passwords: "123qwe",
            isRemember: true
        }
    }),
    methods: {
        async login() {
            var me = this;
            
            let valid = await me.validate();
            if(valid){
                me.authUser();                
            }            
        },
        validate(){
            let me = this;
            return new Promise((resolve,reject)=>{
                me.$refs.form.validate(valid => {
                    valid? resolve(valid):reject(valid);                
                    return valid;
                });
            });
        },
        authUser() {
            var me = this;
            var postData = {
                "tenancyName": "default",
                "usernameOrEmailAddress": me.form.username,
                "password": me.form.passwords
            };
            me.loading = true;
            me.$store.dispatch("login",{ 
                data:postData,
                callback(success){
                if(success) me.$router.push("/");//转到主页
                me.loading = false;   
            }});
        }
    },
    mounted() {
        document.title = webConfig.systemName;
    }
}
</script>
<style lang="scss">
.login-page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("~/static/images/loginbg.png");
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: top left;
    overflow: hidden;    

    .login {
        position: absolute;
        right: 15%;
        top: 50%;
        transform: translate(0,-50%);
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        width: 380px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0px 0px 25px #cac6c6;

        &.title {
            margin: 0 auto 40px;
            text-align: center;
            color: #505458;
        }
    }    

}
</style>
