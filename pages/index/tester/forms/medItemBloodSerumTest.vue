<template>
    <div v-loading="loading">
        <div><h2>血生化（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <span>检查日期</span>
                <el-date-picker class="margin-left-xl" v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="margin-top-xl">
               <table>
                   <thead>
                       <tr><th>检查项目</th><th>检查结果</th><th>单位</th><th>&nbsp;</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>HBsAg</td>
                            <td>
                                <el-input-number v-model="ruleForm.hBsAgResult"></el-input-number>
                            </td>
                            <td>
                                IU/mL
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hBsAgPositive" :label="true">阳性</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hBsAgPositive" :label="false">阴性</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>HBsAb</td>
                            <td>
                                <el-input-number v-model="ruleForm.hBsAbResult"></el-input-number>
                            </td>
                            <td>
                                IU/mL
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hBsAbPositive" :label="true">阳性</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hBsAbPositive" :label="false">阴性</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>HBeAg</td>
                            <td>
                                <el-input-number v-model="ruleForm.hBeAgResult"></el-input-number>
                            </td>
                            <td>
                                s/co
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hBeAgPositive" :label="true">阳性</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hBeAgPositive" :label="false">阴性</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>HBeAb</td>
                            <td>
                                <el-input-number v-model="ruleForm.hBeAbResult"></el-input-number>
                            </td>
                            <td>
                                s/co
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hBeAbPositive" :label="true">阳性</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hBeAbPositive" :label="false">阴性</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>HBeAb</td>
                            <td>
                                <el-input-number v-model="ruleForm.hBcAbResult"></el-input-number>
                            </td>
                            <td>
                                s/co
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hBcAbPositive" :label="true">阳性</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hBcAbPositive" :label="false">阴性</el-radio>
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
        "hBsAgResult": 0,
        "hBsAgPositive": true,
        "hBsAbResult": 0,
        "hBsAbPositive": true,
        "hBeAgResult": 0,
        "hBeAgPositive": true,
        "hBeAbResult": 0,
        "hBeAbPositive": true,
        "hBcAbResult": 0,
        "hBcAbPositive": true
    },
      rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemBloodSerumTest_get, { params: { id: me.id } })
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
              apiConfig.medItemBloodSerumTest_put,
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