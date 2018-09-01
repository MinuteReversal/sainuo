<template>
    <div v-loading="loading">
        <div>T淋巴细胞亚群计数检查（肝纤维化检验）</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <span>检查日期</span>
                <el-date-picker class="margin-left-xl" v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div>
               <table>
                   <thead>
                       <tr><th>检查项目</th><th>检查</th><th>结果</th><th>单位</th><th>临床意义（如超出正常值范围）</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>CD<span class="text-small">4+</span></td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.cD4Check" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.cD4Check" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.cD4Result"></el-input-number>
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.cD4Meaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.cD4Meaning" :label="true">有</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>CD<span class="text-small">8+</span></td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.cD5Check" :label="false">未查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.cD5Check" :label="true">已查</el-radio>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.cD5Result"></el-input-number>
                            </td>
                            <td>
                                IU/L
                            </td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.cD5Meaning" :label="false">无</el-radio>
                                <el-radio class="radio" v-model="ruleForm.cD5Meaning" :label="true">有</el-radio>
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
            "cD4Check": true,
            "cD4Meaning": true,
            "cD4Result": 0,
            "cD5Check": true,
            "cD5Meaning": true,
            "cD5Result": 0
            },
        rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemTlymphocytesTest_get, { params: { id: me.id } })
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
              apiConfig.medItemTlymphocytesTest_put,
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