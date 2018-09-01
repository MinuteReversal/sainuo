<template>
    <div v-loading="loading">
        <div><h2>甲状腺功能检查（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <span>检查日期</span>
                <el-date-picker class="margin-left-xl" v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="margin-top-xl">
               <table>
                   <thead>
                       <tr><th>检查项目</th><th>检查</th><th>结果</th><th>单位</th><th>临床意义（如超出正常值范围）</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>三碘甲状腺原氨酸（T3）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.t3Check" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.t3Check" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.t3Result"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.t3Meaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.t3Meaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.t3Meaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>甲状腺素（T4）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.t4Check" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.t4Check" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.t4Result"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.t4Meaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.t4Meaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.t4Meaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>游离三碘甲腺原氨酸（FT3）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.fT3Check" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fT3Check" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.fT3Result"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.fT3Meaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fT3Meaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fT3Meaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>游离四碘甲腺原氨酸（FT4）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.fT4Check" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fT4Check" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.fT4Result"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.fT4Meaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fT4Meaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fT4Meaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>促甲状腺素（TSH）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tshCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tshCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.tshResult"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tshMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tshMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tshMeaning" :label="true">有</el-radio>
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
            "t3Check": true,
            "t3Meaning": true,
            "t3Result": 0,
            "t4Check": true,
            "t4Meaning": true,
            "t4Result": 0,
            "fT3Check": true,
            "fT3Meaning": true,
            "fT3Result": 0,
            "fT4Check": true,
            "fT4Meaning": true,
            "fT4Result": 0,
            "tshCheck": true,
            "tshMeaning": true,
            "tshResult": 0
        },
        rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemThyroidTest_get, { params: { id: me.id } })
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
              apiConfig.medItemThyroidTest_put,
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