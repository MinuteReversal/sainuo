<template>
    <el-form v-loading="loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="检验项目" prop="medProjectId">
            <biz-select :src="projectgeturl" v-model="ruleForm.medProjectId" :modelMap="model=>model.result.items" valueField="id" displayField="projectName" :showColumns="['projectName']"></biz-select>
        </el-form-item>
        <el-form-item label="CRF号" prop="crfNumber" v-if="id">
            <el-input v-model="ruleForm.crfNumber" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名" prop="patientName">
            <el-input v-model="ruleForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsCode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="ruleForm.smsCode"></el-input>
            </el-col>
            <el-col :span="8">
              <button-cooldown type="primary" @click="onSendSMS">发送短信</button-cooldown>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择出生日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
            <el-radio-button :value="0" label="0">女性</el-radio-button>
            <el-radio-button :value="1" label="1">男性</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="民族" prop="nationality">
          <biz-select src="/data/nationality.json" v-model="ruleForm.nationality" :modelMap="model=>model.data" valueField="name" displayField="name" :showColumns="['name']"></biz-select>
        </el-form-item>
        <div class="text-align-right">
            <el-button @click="$emit('cancel')">取消</el-button>
            <el-button @click="onConfirm" type="primary">保存</el-button>
        </div>
    </el-form>
</template>
<script>
  import axios from "axios"
  import apiConfig from "~/static/apiConfig"
  import BizSelect from "~/components/BizSelect.vue"
  import ButtonCooldown from "~/components/ButtonCooldown.vue"
  import utility from "~/static/javascript/utility"

  export default {
    components:{
        'biz-select':BizSelect,
        "button-cooldown":ButtonCooldown
    },
    data() {
      return {
        id:0,
        loading:false,
        projectgeturl:apiConfig.project_get,
        ruleForm: {
            "medProjectId": null,
            "crfNumber": "",
            "patientName": "",
            "gender": 0,
            "phoneNumber": "",
            "birthday": new Date(),
            "nationality": null,
            "smsCode": "",
            "organizationId": 0
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
        axios.get(apiConfig.tester_read,{ params:{ demologyId:me.id}})
        .then(response=>{
            me.ruleForm = utility.toClientModel(response.data.result);
        })
        .finally(()=>{
            me.loading=false;
        });
      },
      onConfirm() {
        var me=this;
        me.$refs.ruleForm.validate((valid) => {
          if (valid) {
              var me = this;
              if(me.id===0){
                me.loading=true;
                axios.post(apiConfig.tester_create,utility.toServerModel(me.ruleForm))
                .then(response=>{
                  me.$emit("confirm",me.ruleForm);
                })
                .finally(()=>{
                  me.loading=false
                });
              }
              else{
                me.loading = true;
                axios.put(apiConfig.tester_update,utility.toServerModel(me.ruleForm))
                .then(response=>{
                  me.$emit("confirm",me.ruleForm);
                })
                .finally(()=>{
                  me.loading=false;
                });
              }
          }
          return valid;
        });
      },
      onSendSMS(){
        let me=this;
        me.$refs.ruleForm.validateField("phoneNumber",(errorMessage)=>{
          if(errorMessage===""){
            axios.get(apiConfig.tester_sms_red,{params:{phoneNumber:me.ruleForm.phoneNumber}});
          }
        });
      }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id!=="0"){
          me.id = parseInt(me.$route.query.id);
          me.loadData();
        }
    }
  }
</script>