<template>
    <div v-loading="loading">
        <div><h2>人体生命体征体格检查 （肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="身高">
                <el-input-number v-model="ruleForm.height" :min="1" label="请输入身高"></el-input-number>cm
                <div class="color-gray">请输入数字</div>
            </el-form-item>
            <el-form-item label="体重">
                <el-input-number v-model="ruleForm.weight" :min="1" label="请输入体重"></el-input-number>kg
                <div class="color-gray">请输入数字，只保留小数点后一位</div>
            </el-form-item>
            <el-form-item label="BMI">
                <el-input-number v-model="ruleForm.bmi" :min="1" label="请输入BMI"></el-input-number>kg/m2
                <div class="color-gray">体重/身高2</div>
            </el-form-item>
            <el-form-item label="体温">
                <el-input-number v-model="ruleForm.bodyTemperature" :min="1" label="请输入体温"></el-input-number>℃
                <div class="color-gray">请输入数字，只保留小数点后一位</div>
            </el-form-item>
            <el-form-item label="脉搏">
                <el-input-number v-model="ruleForm.pluse" :min="1"  label="请输入脉搏"></el-input-number>次/分
                <div class="color-gray">请输入数字，只保留小数点后一位</div>
            </el-form-item>
            <el-form-item label="呼吸">
                <el-input-number v-model="ruleForm.breath" :min="1"  label="请输入脉搏"></el-input-number>℃
                <div class="color-gray">请输入数字，只保留小数点后一位</div>
            </el-form-item>
            <el-form-item label="血压">
                <el-input-number v-model="ruleForm.systolicPressure" :min="1"  label="请输入收缩压"></el-input-number>\
                <el-input-number v-model="ruleForm.diastolicPressure" :min="1" label="请输入舒张压"></el-input-number>mmHg
                <div class="color-gray">收缩压 请输入数字,舒张压 请输入数字</div>
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

export default {
    data() {
        return {
            id:0,
            loading:false,
            ruleForm:{
                "id": 0,
                "crfBasicId": 0,
                "weight": 0,
                "height": 0,
                "bodyTemperature": 0,
                "pluse": 0,
                "breath": 0,
                "bmi": 0,
                "systolicPressure": 0,
                "diastolicPressure": 0
            },
            rules: {
            }
        };
    },
    watch:{
        "ruleForm.weight"(val,oldVal){
            this.setbmi();
        },
        "ruleForm.height"(val,oldVal){
            this.setbmi()
        }
    },
    methods: {
        setbmi(){
           this.ruleForm.bmi = this.ruleForm.weight/this.ruleForm.height;
        },
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemVitalSign_get,{ params:{ id:me.id}})
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
                    axios.put(apiConfig.medItemVitalSign_put,utility.toServerModel(me.ruleForm))
                    .then(response=>{
                        me.$emit("confirm",response.data.result);
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