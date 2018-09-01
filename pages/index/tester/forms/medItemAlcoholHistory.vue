<template>
    <div v-loading="loading">
        <div><h2>饮酒史（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <el-radio v-model="ruleForm.hadAlcoholLastYear" :label="false">无</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.hadAlcoholLastYear" :label="true">有</el-radio>
                如有，每日用量：<el-input-number :min="0" v-model="ruleForm.quantityOfAlcohol"></el-input-number>g
            </div>
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

export default {
    data() {
        return {
            id:0,
            loading:false,
            ruleForm:{
                "id": 0,
                "crfBasicId": 0,
                "hadAlcoholLastYear": true,
                "quantityOfAlcohol": 0
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
            axios.get(apiConfig.medItemAlcoholHistory_get,{ params:{ id:me.id}})
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
                    axios.put(apiConfig.medItemAlcoholHistory_put,utility.toServerModel(me.ruleForm))
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