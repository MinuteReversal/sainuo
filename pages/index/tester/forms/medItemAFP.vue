<template>
    <div v-loading="loading">
        <div><h2>血生化（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
              <span>检查日期</span>
              <el-date-picker class="margin-left-xl" v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div>
               <table>
                   <thead>
                       <tr><th>检查项目</th><th>检查</th><th>结果</th><th>单位</th></tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>甲胎蛋白（AFP）</td>
                            <td>
                                <el-radio class="radio" v-model="ruleForm.checked" :label="true">已查</el-radio>
                                <el-radio class="radio" v-model="ruleForm.checked" :label="false">未查</el-radio>
                                <el-input v-if="!ruleForm.checked" type="text" v-model="ruleForm.notCheckReason" placeholder="未查原因"></el-input>
                            </td>
                            <td>
                                <el-input-number v-model="ruleForm.result"></el-input-number>
                            </td>
                            <td>
                                ng/ml
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
        "crfBasicId": 0,
        "testDate": new Date(),
        "checked": true,
        "result": 0,
        "notCheckReason": "",
        "id": 0
        },
      rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemAFP_get, { params: { id: me.id } })
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
          axios
            .put(
              apiConfig.medItemAFP_put,
              utility.toServerModel(me.ruleForm)
            )
            .then(response => {
              me.$emit("confirm", response.data.result);
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