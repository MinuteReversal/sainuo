<template>
   <div class="padding-xl">
       <el-form :model="ruleForm" :rules="rules" v-loading="loading" ref="ruleForm" label-width="120px">
           <el-form-item label="名称">
               <el-input v-model="ruleForm.name"></el-input>
           </el-form-item>
            <el-form-item label="排序值">
               <el-input-number v-model="ruleForm.order" :min="0"></el-input-number>
           </el-form-item>
           <el-form-item label="启用">
                <el-radio-group v-model="ruleForm.isShow">
                <el-radio-button :label="1">是</el-radio-button>
                <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
           </el-form-item>
        <el-form-item class="text-align-right">
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">保存</el-button>
        </el-form-item>
       </el-form>
   </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig.js"

export default {
    data(){
        return {
            id:0,
            loading:false,            
            ruleForm:{
                "id": 0,
                "name": "",
                "order": 1,
                "isShow": 0
            },
            rules:{
                name: [
                    { required: true, message: '请输入栏目名称', trigger: 'blur' },
                    { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        onCancel(){
            this.$emit("cancel");
        },
        onConfirm() {
            var me = this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if(me.id===0){
                        axios.post(apiConfig.category_create,me.ruleForm).then(response=>{
                            me.$emit("confirm",me.ruleForm);
                        });
                    }
                    else{                        
                        axios.put(apiConfig.category_update,me.ruleForm).then(response=>{
                            me.$emit("confirm",me.ruleForm);
                        });
                    }
                                        
                    return true;
                } else {
                    return false;
                }
            });
        },
        loadData(){
            var me = this;
            me.loading=true;
            axios.get(apiConfig.category_read,{params:{ id:me.id}})
            .then(response=>{
                me.ruleForm = response.data.result;
                me.$refs.permissionsTree.setCheckedKeys(me.ruleForm.permissions);
            })
            .finally(()=>{   
                me.loading=false;
            });
        }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id !== "0"){
            me.id = parseInt(me.$route.query.id);
            me.loadData();
        } 
    }
}
</script>