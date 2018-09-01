<template>
    <div v-loading="loading">
        <div><h2>血常规检查（肝纤维化检验）</h2></div>
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
                            <td>白细胞总数WBC</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.whiteBloodCellCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.whiteBloodCellCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.whiteBloodCell"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.whiteBloodCellMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.whiteBloodCellMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.whiteBloodCellMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>红细胞计数RBC</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.redBloodCellCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.redBloodCellCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.redBloodCell"></el-input-number>
                            </td>
                            <td>
                                ×1012 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.redBloodCellMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.redBloodCellMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.redBloodCellMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>血红蛋白HB</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hemoglobinBloodCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hemoglobinBloodCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.hemoglobinBlood"></el-input-number>
                            </td>
                            <td>
                                g/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.hemoglobinBloodMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hemoglobinBloodMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.hemoglobinBloodMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>中性粒细胞计数NEUT</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.neutCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.neutCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.neut"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.neutMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.neutMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.neutMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>淋巴细胞计数LYMPH</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.lymphCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.lymphCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.lymph"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.lymphMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.lymphMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.lymphMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>单核细胞计数MONO</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.monoCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.monoCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.mono"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.monoMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.monoMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.monoMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>嗜酸性粒细胞EO</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.eoCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.eoCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.eo"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.eoMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.eoMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.eoMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>嗜碱性粒细胞BASO</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.basoCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.basoCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.baso"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.basoMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.basoMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.basoMeaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>血小板计数PLT</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.pltCheck" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.pltCheck" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.plt"></el-input-number>
                            </td>
                            <td>
                                ×109 /L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.pltMeaning" :label="null">未填写</el-radio>
                                <el-radio class="radio" v-model="ruleForm.pltMeaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.pltMeaning" :label="true">有</el-radio>
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
      ruleForm: {
        id: 0,
        crfBasicId: 0,
        whiteBloodCellCheck: true,
        whiteBloodCellMeaning: true,
        whiteBloodCell: 0,
        redBloodCellCheck: true,
        redBloodCellMeaning: true,
        redBloodCell: 0,
        hemoglobinBloodCheck: true,
        hemoglobinBloodMeaning: true,
        hemoglobinBlood: 0,
        neutCheck: true,
        neutMeaning: true,
        neut: 0,
        lymphCheck: true,
        lymphMeaning: true,
        lymph: 0,
        monoCheck: true,
        monoMeaning: true,
        mono: 0,
        eoCheck: true,
        eoMeaning: true,
        eo: 0,
        basoCheck: true,
        basoMeaning: true,
        baso: 0,
        pltCheck: true,
        pltMeaning: true,
        plt: 0,
        testDate: "2018-05-07T12:51:57.559Z"
      },
      rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemBloodRoutineTest_get, { params: { id: me.id } })
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
              apiConfig.medItemBloodRoutineTest_put,
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