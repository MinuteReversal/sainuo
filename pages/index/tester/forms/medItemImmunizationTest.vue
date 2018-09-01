<template>
    <div v-loading="loading">
        <div><h2>免疫学和特殊化学检查 （肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <span>检查日期</span>
                <el-date-picker class="margin-left-xl" v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="margin-top-xl">
               <table>
                   <thead>
                       <tr><th>检查项目</th><th colspan="3">检查结果</th><th>单位</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>抗-HIV</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hivCheck" :label="1">阳性</el-radio>
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hivCheck" :label="2">阴性</el-radio>
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hivCheck" :label="0">未查</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>抗核抗体（ANA）</td>
                            <td colspan="2">
                                <el-input-number v-model="ruleForm.anaResult"></el-input-number>
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.anaCheck" :true-label="false" :false-label="true">未查</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>甲胎蛋白（AFP）</td>
                            <td colspan="2">
                                <el-input-number v-model="ruleForm.afpResult"></el-input-number>ng/ml
                            </td>
                                <td>
                                <el-radio class="radio" v-model="ruleForm.afpCheck" :true-label="false" :false-label="true">未查</el-radio>
                            </td>
                        </tr>
                    </tbody>
               </table>
            </div>
            <div class="text-align-right">
                <el-button @click="$emit('cancel')">取消</el-button>
                <el-button @click="onConfirm" type="primary">保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import axios from "axios";
import apiConfig from "~/static/apiConfig";
import utility from "~/static/javascript/utility";

export default {
  data() {
    return {
        id: 0,
        loading:false,
        ruleForm:{
            "id": 0,
            "crfBasicId": 0,
            "testDate": new Date(),
            "hivCheck": true,
            "anaCheck": true,
            "anaResult": 0,
            "afpCheck": true,
            "afpResult": 0
        },
        rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemImmunizationTest_get, { params: { id: me.id } })
        .then(response => {
          me.ruleForm = utility.toClientModel(response.data.result);
        })
        .finally(()=>{
              me.loading=false;
        });
    },
    onConfirm() {
      var me = this;
      me.$refs.ruleForm.validate(valid => {
        if (valid) {
          var me = this;
          me.loading=true;
          axios
            .put(
              apiConfig.medItemImmunizationTest_put,
              utility.toServerModel(me.ruleForm)
            )
            .then(response => {
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
  mounted() {
    var me = this;
    if (typeof me.$route.query.id === "string" && me.$route.query.id !== "0") {
      me.id = parseInt(me.$route.query.id);
      me.loadData();
    }
  }
};
</script>