<template>
    <div v-loading="loading">
        <div><h2>心肌酶谱检查（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <span>检查日期</span>
                <el-date-picker class="margin-left-xl" type="date" placeholder="选择日期" v-model="ruleForm.testDate"></el-date-picker>
            </div>
            <div class="margin-top-xl">
               <table>
                   <thead>
                       <tr><th>检查项目</th><th>检查</th><th>结果</th><th>单位</th><th>临床意义（如超出正常值范围）</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>肌酸激酶（CK）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ckCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ckCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.ckResult"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ckMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ckMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ckMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>乳酸脱氢酶（LDH）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ldhCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ldhCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.ldhResult"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ldhMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ldhMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ldhMeaning" :label="true">有</el-radio>
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
        "ckCheck": true,
        "ckMeaning": true,
        "ckResult": 0,
        "ldhCheck": true,
        "ldhMeaning": true,
        "ldhResult": 0,
        "testDate": new Date()
        },
      rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemCKMBTest_get, { params: { id: me.id } })
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
              apiConfig.medItemCKMBTest_put,
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