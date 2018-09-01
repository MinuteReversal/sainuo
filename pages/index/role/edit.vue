<template>
    <el-form :model="ruleForm" :rules="rules" v-loading="loading" ref="ruleForm" label-width="120px">
        <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="displayName">
            <el-input v-model="ruleForm.displayName"></el-input>
        </el-form-item>
        <el-form-item label="标准名称" prop="normalizedName">
            <el-input v-model="ruleForm.normalizedName"></el-input>
        </el-form-item>
        <el-form-item label="静态" prop="isStatic">
            <el-checkbox v-model="ruleForm.isStatic"></el-checkbox>
        </el-form-item>
        <el-form-item label="说明" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="permissions">
            <el-tree
                ref="permissionsTree"
                v-loading="permissionsLoading"
                :data="permissions"
                show-checkbox
                node-key="name"
                :default-checked-keys="ruleForm.permissions"
                @check-change="onCheckChange"
                :props="props">
            </el-tree>
        </el-form-item>
        <el-form-item class="text-align-right">
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import apiConfig from "~/static/apiConfig"
import axios from "axios"
export default {
    data:()=> ({
        id:0,
        loading:false,
        permissions:[],
        permissionsLoading:false,
        props:{
          children: 'children',
          label: 'displayName'
        },
        ruleForm: {
            "name": "",
            "displayName": "",
            "normalizedName": "",
            "description": "",
            "isStatic": true,
            "permissions": []
        },
        rules: {
            name: [
                { required: true, message: '请填写角色名称', trigger: 'blur' }
            ]
        }
    }),
    methods: {
        onCheckChange(node,isSelected,subSelectedNodes){
            var me=this;
            me.ruleForm.permissions=me.$refs.permissionsTree.getCheckedKeys();
        },
        onCancel(){
            this.$emit("cancel");
        },
        onConfirm() {
            var me = this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let url= me.id===0? apiConfig.role_create:apiConfig.role_update;
                    axios.post(url,me.ruleForm).then(response=>{
                        me.$emit("confirm",me.ruleForm);
                    });
                    return true;
                } else {
                    return false;
                }
            });
        },
        loadData(){
            var me = this;
            me.loading=true;
            axios.post(apiConfig.role_get,{ id:me.id})
            .then(response=>{
                me.ruleForm = response.data.result;
                me.$refs.permissionsTree.setCheckedKeys(me.ruleForm.permissions);
            })
            .finally(()=>{   
                me.loading=false;
            });
        },
        loadPermissions(){
            var me = this;
            me.permissionsLoading=true;
            axios.get(apiConfig.permission_all_get)
            .then(response=>{
                me.permissions = response.data.result;
            })
            .finally(()=>{
                me.permissionsLoading=false;
            });
        }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id !== "0"){
            me.id = parseInt(me.$route.query.id);
            me.loadData();
        }
        me.loadPermissions();
    }
}
</script>