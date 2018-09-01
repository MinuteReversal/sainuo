<template>
<div id="ChangePassword" class="padding-xl" v-loading="loading">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="ruleForm.checkPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    export default{        
        data:()=> ({
            loading:false,
            ruleForm: {
                password: "",
                newPassword: "",
                checkPassword: ""
            },
            rules: {
                password: [
                    {
                        validator: function (rule, value, callback) {
                            if (value === '') {
                                callback(new Error('请输入密码'));
                            } else {
                                if (this.form.password !== '') {
                                    this.$refs.form.validateField('checkPassword');
                                }
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
                newPassword: [
                    {
                        validator: function (rule, value, callback) {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.form.checkPassword) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ],
                checkPassword: [
                    {
                        validator: function (rule, value, callback) {
                            if (value === '') {
                                callback(new Error('请再次输入密码'));
                            } else if (value !== this.form.newPassword) {
                                callback(new Error('两次输入密码不一致!'));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }
                ]
            }
        }),
        methods: {
            submitForm: function () {
                this.$refs.from.validate(function (valid) {
                    if (valid) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>