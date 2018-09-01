<template>
    <div v-loading="loading">
        <div><h2>腹部（肝胆胰脾肾脏）B超（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <el-radio v-model="ruleForm.checked" :label="false">未检查</el-radio>
                <el-input v-if="!ruleForm.checked"  v-model="ruleForm.notCheckReason" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <el-radio v-model="ruleForm.checked" :label="true">已查</el-radio>
                <template v-if="ruleForm.checked">
                <div>
                    <el-form-item label="检查日期">
                        <el-date-picker v-model="ruleForm.testDate" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </div>
                <div>
                    <el-radio v-model="ruleForm.hasException" :label="null">未填写</el-radio>
                </div>
                <div>
                    <el-radio v-model="ruleForm.hasException" :label="false">无异常发现</el-radio>
                </div>
                <div>
                    <el-radio v-model="ruleForm.hasException" :label="true">有异常发现</el-radio>
                </div>
                <div>
                    <el-input  v-model="ruleForm.exceptionContent" type="textarea" :rows="2" :autosize="{ minRows: 2}" :max=1000 placeholder="请描述异常1000个字以内"></el-input>
                </div>
                </template>
            </div>
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
        "hasException": true,
        "exceptionContent": ""
      },
      rules: {}
    };
  },
  methods: {
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemBellUltrasound_get, { params: { id: me.id } })
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
              apiConfig.medItemBellUltrasound_put,
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