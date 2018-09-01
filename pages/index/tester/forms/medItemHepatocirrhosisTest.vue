<template>
    <div v-loading="loading">
        <div><h2>肝硬度检测 （肝纤维化检验）用Fibro-Touch或肝组织活检检测患者肝脏硬度状态</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <el-form-item label="检查">
                <el-radio class="radio" v-model="ruleForm.checked" :label="true">已查</el-radio>
                <el-radio class="radio" v-model="ruleForm.checked" :label="false">未查</el-radio>
            </el-form-item>
            <el-input v-if="!ruleForm.checked" v-model="ruleForm.notCheckReason" placeholder="请填写未查原因"></el-input>
            <template  v-if="ruleForm.checked">
              <el-form-item label="检查日期">
                  <el-date-picker v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="检查结果">
                  <el-input   v-model="ruleForm.testResult" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入检查的结果"></el-input>
              </el-form-item>
            </template>
            <div class="text-align-right margin-top-xl">
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
            "checked": true,
            "notCheckReason": "",
            "testDate": new Date(),
            "testResult": ""
        },
        rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemHepatocirrhosisTest_get, { params: { id: me.id } })
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
              apiConfig.medItemHepatocirrhosisTest_put,
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