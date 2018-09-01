<template>
    <div v-loading="loading">
        <div>血生化（肝纤维化检验）</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <el-form-item label="检查日期">
                    <el-date-picker v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </div>
            <div>
               <table>
                   <thead>
                       <tr><th>检查项目</th><th>检查</th><th>结果</th><th>单位</th><th>临床意义（如超出正常值范围）</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>谷草转氨酶AST</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.astCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.astCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.astResult"></el-input-number>
                            </td>
                            <td>
                                IU/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.astMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.astMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>谷丙转氨酶ALT</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.altCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.altCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.altResult"></el-input-number>
                            </td>
                            <td>
                                IU/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.altMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.altMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>碱性磷酸酶ALP</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.alpCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.alpCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.alpResult"></el-input-number>
                            </td>
                            <td>
                                U/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.alpMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.alpMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>γ-谷氨酰转肽酶γ-GT</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.yGTCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.yGTCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.yGTResult"></el-input-number>
                            </td>
                            <td>
                                U/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.yGTMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.yGTMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>总蛋白TP</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tpCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tpCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.tpResult"></el-input-number>
                            </td>
                            <td>
                                g/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tpMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tpMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>白蛋白ALB</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.albCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.albCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.albResult"></el-input-number>
                            </td>
                            <td>
                                g/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.albMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.albMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>总胆红素TBIL</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tbilCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tbilCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.tbilResult"></el-input-number>
                            </td>
                            <td>
                                μmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tbilMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tbilMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>直接胆红素DBIL</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.dbilCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.dbilCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.dbilResult"></el-input-number>
                            </td>
                            <td>
                                μmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.dbilMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.dbilMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>尿素Urea</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ureaCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ureaCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.ureaResult"></el-input-number>
                            </td>
                            <td>
                                mmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ureaMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ureaMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>肌酐Cr</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.crCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.crCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.crResult"></el-input-number>
                            </td>
                            <td>
                                μmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.crMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.crMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>空腹血糖FBG</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.fbgCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fbgCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.fbgResult"></el-input-number>
                            </td>
                            <td>
                                mmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.fbgMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.fbgMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>血清总胆固醇TC</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tcCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tcCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.tcResult"></el-input-number>
                            </td>
                            <td>
                                mmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tcMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tcMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>甘油三酯TG</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tgCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tgCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.tgResult"></el-input-number>
                            </td>
                            <td>
                                mmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.tgMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.tgMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>高密度脂蛋白HDL-c</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hdlcCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hdlcCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.hdlcResult"></el-input-number>
                            </td>
                            <td>
                                mmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hdlcMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hdlcMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>低密度脂蛋白LDL-c</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ldlcCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ldlcCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.ldlcResult"></el-input-number>
                            </td>
                            <td>
                                mmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.ldlcMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.ldlcMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>尿酸UA</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.uaCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.uaCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.uaResult"></el-input-number>
                            </td>
                            <td>
                                μmol/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.uaMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.uaMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>脂肪酶LPS</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.lpsCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.lpsCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.lpsResult"></el-input-number>
                            </td>
                            <td>
                                U/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.lpsMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.lpsMeaning" :label="true">有</el-radio>
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
            "astCheck": true,
            "astMeaning": true,
            "astResult": 0,
            "altCheck": true,
            "altMeaning": true,
            "altResult": 0,
            "alpCheck": true,
            "alpMeaning": true,
            "alpResult": 0,
            "yGTCheck": true,
            "yGTMeaning": true,
            "yGTResult": 0,
            "tpCheck": true,
            "tpMeaning": true,
            "tpResult": 0,
            "albCheck": true,
            "albMeaning": true,
            "albResult": 0,
            "tbilCheck": true,
            "tbilMeaning": true,
            "tbilResult": 0,
            "dbilCheck": true,
            "dbilMeaning": true,
            "dbilResult": 0,
            "ureaCheck": true,
            "ureaMeaning": true,
            "ureaResult": 0,
            "crCheck": true,
            "crMeaning": true,
            "crResult": 0,
            "fbgCheck": true,
            "fbgMeaning": true,
            "fbgResult": 0,
            "tcCheck": true,
            "tcMeaning": true,
            "tcResult": 0,
            "tgCheck": true,
            "tgMeaning": true,
            "tgResult": 0,
            "hdlcCheck": true,
            "hdlcMeaning": true,
            "hdlcResult": 0,
            "ldlcCheck": true,
            "ldlcMeaning": true,
            "ldlcResult": 0,
            "uaCheck": true,
            "uaMeaning": true,
            "uaResult": 0,
            "lpsCheck": true,
            "lpsMeaning": true,
            "lpsResult": 0,
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
        .get(apiConfig.medItemBloodBiochemistryTest_get, { params: { id: me.id } })
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
              apiConfig.medItemBloodBiochemistryTest_put,
              utility.toServerModel(me.ruleForm)
            )
            .then(response => {
              me.$emit("confirm", me.ruleForm);
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