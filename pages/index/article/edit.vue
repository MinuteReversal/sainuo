<template>
    <el-form :model="ruleForm" :rules="rules" v-loading="loading" ref="ruleForm" label-width="120px">
        <el-form-item label="所属栏目" prop="categoryId">
            <biz-select :src="urls.category_get" placeholder="所属栏目" v-model="ruleForm.categoryId" :modelMap="model=>model.result.items" valueField="id" displayField="name" :showColumns="['name','id']"></biz-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="img">
            <biz-base64-image v-model="ruleForm.img"></biz-base64-image>
            <div class="color-gray">
                图片高宽:800x600
            </div>
        </el-form-item>
        <el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author" disabled></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <ckeditor v-model="ruleForm.content"></ckeditor>
        </el-form-item>
        <el-form-item class="text-align-right">
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import CKEditor from "~/components/CKEditor4.vue"
import BizBase64Image from "~/components/BizBase64Image.vue"
import BizSelect from "~/components/BizSelect.vue"

export default {
    components:{
        'biz-base64-image':BizBase64Image,
        'ckeditor':CKEditor,
        'biz-select':BizSelect
    },
    data(){
        return {
            id:0,
            loading:false,
            urls:apiConfig,
            ruleForm:{
                "id": 0,
                "title": "",
                "categoryId": 0,
                "img": "",
                "content": "",
                "author": "",
                "isTop": 0
            },
            rules:{
                categoryId: [
                    { required: true, message: '请选择文章所属的栏目', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入文章的标题', trigger: 'blur' },
                    { min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur' }
                ],
                img:[
                    { required: true, message: '请选择图片', trigger: 'blur' },
                    { min: 8, message: '请选择图片', trigger: 'blur' }
                ],
                author:[
                    { required: true, message: '输入作者名字', trigger: 'blur' }
                ],
                content:[
                    { required: true, message: '输入文章内容', trigger: 'blur' }
                ]
            }
        };
    },
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
                    if(me.id===0){
                        axios.post(apiConfig.article_create,me.ruleForm).then(response=>{
                            me.$emit("confirm",me.ruleForm);
                        });
                    }
                    else{
                        axios.put(apiConfig.article_update,me.ruleForm).then(response=>{
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
            axios.get(apiConfig.article_read,{params:{ id:me.id}})
            .then(response=>{
                me.ruleForm = response.data.result;
                me.$refs.permissionsTree.setCheckedKeys(me.ruleForm.permissions);
            })
            .finally(()=>{   
                me.loading=false;
            });
        },
        loadAuthor(){
            var me = this;
            me.loading=true;
            axios.get(apiConfig.article_author)
            .then(response=>{
                me.ruleForm.author = response.data.result.name;
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
        else{
            me.loadAuthor();
        }
    }
}
</script>