<template>
    <div v-loading="loading">
        <div><h2>凝血检查（肝纤维化检验）</h2></div>
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
                            <td>凝血酶原时间PT</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ptCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ptCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.ptResult"></el-input-number>
                            </td>
                            <td>
                                s
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ptMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ptMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ptMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>凝血活酶时间APTT</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.apttCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.apttCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.apttResult"></el-input-number>
                            </td>
                            <td>
                                s
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.apttMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.apttMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.apttMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>凝血酶原活动度PTA</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ptaCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ptaCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.ptaResult"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ptaMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ptaMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ptaMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>INR</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.inrCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.inrCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.inrResult"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.inrMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.inrMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.inrMeaning" :label="true">有</el-radio>
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
        "ptCheck": true,
        "ptMeaning": true,
        "ptResult": 0,
        "apttCheck": true,
        "apttMeaning": true,
        "apttResult": 0,
        "ptaCheck": true,
        "ptaMeaning": true,
        "ptaResult": 0,
        "inrCheck": true,
        "inrMeaning": true,
        "inrResult": 0,
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
        .get(apiConfig.medItemBloodCoagulationTest_get, { params: { id: me.id } })
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
              apiConfig.medItemBloodCoagulationTest_put,
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