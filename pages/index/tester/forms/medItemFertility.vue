<template>
    <div v-loading="loading">
        <div><h2>生育状况（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <el-radio v-model="ruleForm.option" :label="0">不适用（男性）</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.option" :label="1">手术绝育</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.option" :label="2">绝经后</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.option" :label="3">具有生育能力，是否采取避孕措施？</el-radio>
                <div v-if="ruleForm.option===3">
                    <el-radio v-model="ruleForm.takeBirthControlOrNot" :label=true>是</el-radio>
                    <el-radio v-model="ruleForm.takeBirthControlOrNot" :label=false>否</el-radio>
                </div>
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
                "option": 0,
                "takeBirthControlOrNot": true
            },
            rules: {
            }
        };
    },
    methods: {
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemFertility_get,{ params:{ id:me.id}})
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
                    axios.put(apiConfig.medItemFertility_put,utility.toServerModel(me.ruleForm))
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