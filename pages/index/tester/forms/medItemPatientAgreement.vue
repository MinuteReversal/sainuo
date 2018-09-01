<template>
<div v-loading="loading">
    <div><h2>受试者知情同意书（肝纤维化检验）</h2></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px">
        <el-form-item label="签署日期" prop="signTime">
            <el-date-picker
            v-model="ruleForm.signTime"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="上传同意书照片" prop="agreementImgBase64">
            <biz-base64-image :preview="false" v-model="ruleForm.agreementImgBase64"></biz-base64-image>
        </el-form-item>
        <el-form-item v-if="typeof ruleForm.agreementImgBase64 === 'string'">
            <img :src="ruleForm.agreementImgBase64" style="max-width:100%;"/>
        </el-form-item>
        <div class="text-align-right">
            <el-button @click="$emit('cancel')">取消</el-button>
            <el-button @click="onConfirm" type="primary">保存</el-button>
        </div>
    </el-form>
</div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import utility from "~/static/javascript/utility"
import BizBase64Image from "~/components/BizBase64Image.vue"

export default {
    components:{
        "biz-base64-image":BizBase64Image
    },
    data() {
        return {
            id:0,
            loading:false,
            ruleForm: {
                "id": 0,
                "crfBasicId": 0,
                "agreementImgBase64": null,
                "signTime":new Date()
            },
            rules: {
                agreementImgBase64: [
                    { required: true, message: '请上传同意书照片', trigger: 'change' }
                ],
                signTime:[
                    { required: true, message: '请选择签署日期', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemPatientAgreement_get,{ params:{ id:me.id}})
            .then(response=>{
                me.ruleForm = utility.toClientModel(response.data.result);
            })
            .finally(()=>{
              me.loading=false;
            });
        },
        onChange(e){
            let me=this;
            let fr=new FileReader();
            fr.addEventListener("load",evt=>{
                var base64 = evt.target.result;
                me.ruleForm.agreementImgBase64=base64;
            });
            fr.readAsDataURL(e.target.files[0]);
        },
        onConfirm() {
            var me=this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    var me = this;
                    me.loading=true;
                    axios.put(apiConfig.medItemPatientAgreement_put,utility.toServerModel(me.ruleForm))
                    .then(response=>{
                        me.$emit("confirm", response.data.result);
                    })
                    .finally(()=>{
                        me.loading=false;
                    });
                }
                return valid;
            });
        }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id!=="0"){
            me.id = parseInt(me.$route.query.id);
            me.loadData();
        }
    }
}
</script>
<style scoped>
.agreement-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .agreement-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .agreement-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:1px dashed #d9d9d9;
    border-radius: 6px;
  }
</style>

