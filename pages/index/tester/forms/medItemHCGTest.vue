<template>
    <div v-loading="loading">
        <div><h2>育龄妇女血或尿HCG检测（肝纤维化检验）（仅适用于女性，18周岁至绝经后1年）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <span>检查日期</span>
                <el-date-picker class="margin-left-xl" type="date" placeholder="选择日期" v-model="ruleForm.testDate"></el-date-picker>
            </div>
            <div>
                <el-radio v-model="ruleForm.testResult" :label="0">阴性</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.testResult" :label="1">阳性</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.testResult" :label="2">未做</el-radio>
            </div>
            <div>
                <span>女性受试者注明原因</span>
                <el-input v-model="ruleForm.notCheckReason" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入内容"></el-input>
            </div>
            <div class="text-align-right margin-top-xl">
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

export default {
    data() {
        return {
            id:0,
            loading:false,
            ruleForm:{
                "id": 0,
                "crfBasicId": 0,
                "testDate": new Date(),
                "testResult": 0,
                "notCheckReason":""
            },
            rules: {
                agreementImgBase64: [
                    { required: true, message: '请上传同意书照片', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemHCGTest_get,{ params:{ id:me.id}})
            .then(response=>{
                me.ruleForm = utility.toClientModel(response.data.result);
            })
            .finally(()=>{
              me.loading=false;
            });
        },
        onConfirm() {
            var me=this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    var me = this;
                    me.loading=true;
                    axios.put(apiConfig.medItemHCGTest_put,utility.toServerModel(me.ruleForm))
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