<template>
  <div v-loading="loading">
      <el-alert title="剔除病例将导致该受试者的所有CRF文档被标记为已剔除，但保留数据，请谨慎操作！"  type="warning" :closable="false"></el-alert>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div v-for="(option,index) in options" :key="index" label="">
            <el-radio v-model="ruleForm.reasonId" name="reasonId" :label="option.reasonId">{{option.reasonName}}</el-radio>
        </div>
        <el-input type="textarea" v-model="ruleForm.otherReason" placeholder="其他详情"></el-input>
        <div class="text-align-right margin-top-xl">
            <el-button @click="$emit('cancel')">取消</el-button>
            <el-button @click="onConfirm" type="primary">保存</el-button>
        </div>
    </el-form>
  </div>
</template>
<script>
  import axios from "axios"
  import apiConfig from "~/static/apiConfig"
  import BizSelect from "~/components/BizSelect.vue"
  import ButtonCooldown from "~/components/ButtonCooldown.vue"

  export default {
    components:{
        'biz-select':BizSelect,
        "button-cooldown":ButtonCooldown
    },
    data() {
      return {
        isEdit:false,
        loading:false,
        options:[],
        ruleForm: {
          "demologyId":0,
          "reasonId": 0,
          "otherReason": ""
        },
        rules: {
          medProjectId: [
            { required: true, message: '请选择检验项目', trigger: 'change' }
          ],
          patientName: [
            { required: true, message: '请输入患者姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
          ],
          birthday: [
            { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          nationality: [
            { required: true, message: '请选择检验项目', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      loadData(){
        var me=this;
        me.loading=true;
        axios.get(apiConfig.tester_not_qualified_reason_read,{ demologyId:me.id})
        .then(response=>{
          if(response.data.result!==null)
          {
            me.ruleForm = response.data.result;
          } 
        })
        .finally(()=>{
          me.loading=false;
        });
      },
      loadOptions(){
        let me=this;
        axios.get(apiConfig.tester_not_qualified_reasons_get).then(response=>{
            me.options = response.data.result;
        });
      },
      onConfirm() {
        var me=this;
        me.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var me = this;
            me.loading=true;
              axios.post(apiConfig.tester_not_qualified_reason_create,me.ruleForm)
              .then(response=>{  
                me.$emit("confirm",me.ruleForm);
              })
              .finally(()=>{
                me.loading=false;
              });
          }
          return valid;
        });
      }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id!=="0"){
          me.ruleForm.demologyId=me.$route.query.id;
        }
        me.loadData();
        me.loadOptions();
    }
  }
</script>

