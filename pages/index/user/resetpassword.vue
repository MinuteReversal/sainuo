<template>
<div id="ChangePassword" class="padding-xl" v-loading="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="ruleForm.checkPassword" auto-complete="off"></el-input>
        </el-form-item>
        <div class="text-align-right">
            <el-button @click="$emit('cancel')">取消</el-button>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
    </el-form>
</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
export default {        
    data(){
        var me=this;
        let passwordValidator=(rule, value, callback)=> {
                        if (value === '') {
                            callback(new Error('请输入密码'));
                        } 
                        callback();
        };

        let checkPasswordValidator=(rule, value, callback)=> {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== me.ruleForm.password) {
                            callback(new Error('两次输入密码不一致!'));
                        } else {
                            callback();
                        }
                    };

        return {
            id:0,
            loading:false,
            ruleForm: {
                password: "",
                checkPassword: ""
            },
            rules: {
                password: [{validator: passwordValidator, trigger: 'blur'}],
                checkPassword: [{validator:checkPasswordValidator , trigger: 'blur'}]
            }
        };
    },
    methods: {
        submitForm () {
            var me=this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    me.loading=true;
                    axios.put(apiConfig.user_resetpassword,{userId:me.id,password:me.ruleForm.password})
                    .then(response=>{
                        me.$emit("confirm",me.ruleForm);
                    })
                    .finally(()=>{
                        me.loading=false;
                    });
                    return true;
                } else {
                    return false;
                }
            });
        }
    },
   mounted() {
    var me = this;
    let q = me.$route.query;
    if (typeof q.id === "string" && q.id !== "0") {
      me.id = parseInt(q.id);
    }
  }
}
</script>