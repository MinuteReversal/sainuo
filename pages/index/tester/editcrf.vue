<template>
    <el-form v-loading="loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item v-if="id===0" label="CRF号" prop="crfNumber">
          <el-input-number v-model="crfNumber" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="检验阶段" prop="medicalExamPhaseId">
          <biz-select :disabled="id>0" ref="bs" :src="urls.crf_phases_get" :auto-load="false" :params={userId:ruleForm.userId} v-model="ruleForm.medicalExamPhaseId" :modelMap="x=>x.result.items" valueField="id" displayField="phasesName" :showColumns="['phasesName']"></biz-select>
        </el-form-item>
        <el-form-item label="访视日期" prop="visitTime">
            <el-date-picker v-model="ruleForm.visitTime" type="date" placeholder="选择访视日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="访视" prop="visitNumber">
          <biz-select src="/data/visitnumber.json" v-model="ruleForm.visitNumber" placeholder="访视"></biz-select>
        </el-form-item>
        <div v-loading="testerLoading">
          <el-form-item label="患者姓名" prop="patientName">
            <span>{{tester.patientName}}</span>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <span>{{tester.phoneNumber}}</span>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <span>{{tester.gender?"男":"女"}}</span>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <span>{{tester.birthday}}</span>
          </el-form-item>
        </div>
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
  import utility from "~/static/javascript/utility"

  export default {
    components:{
        'biz-select':BizSelect
    },
    data() {
      return {
        id:0,
        crfNumber:1,
        loading:false,
        testerLoading:false,
        urls:{
          crf_phases_get:apiConfig.crf_phases_get
        },
        tester:{
            "userId": 0,
            "patientName": "string",
            "medProjectId": 0,
            "gender": 0,
            "phoneNumber": "",
            "birthday": "2018-05-05T08:59:49.614Z",
            "nationality": "string",
            "quit": true,
            "notQualified": true,
            "crfNumber": 0
        },
        ruleForm: {
            "userId": 0,
            "medicalExamPhaseId": null,
            "medicalExamProjectId": 0,
            "visitTime": new Date(),
            "visitNumber": 0
        },
        rules: {
          medicalExamPhaseId: [
            { required: true, message: '请选择检验阶段', trigger: 'change' }
          ]
        }
      };
    },
    watch:{
      crfNumber(val,oldVal){
        this.getTestByCRF();
      }
    },
    methods: {
      loadData(){
        var me=this;
        me.loading=true;
        axios.get(apiConfig.crf_read,{ params:{ crfBaseId:me.id}})
        .then(response=>{
            let r=response.data.result;
            me.ruleForm = r;
            me.tester.phoneNumber=r.phoneNumber;
            me.tester.gender=r.gender;
            me.tester.birthday=r.birthday;
            me.tester.patientName=r.patientName;
            me.$nextTick(()=>{
              me.$refs.bs.loadData();
            });
        })
        .finally(()=>{
          me.loading=false
        });
      },
      getTestByCRF(){
        var me=this;
        me.testerLoading=true;
        axios.get(apiConfig.tester_read_by_crf,{ params:{ crfNumber:me.crfNumber}})
        .then(response=>{
            me.tester=response.data.result;
            me.ruleForm.userId=me.tester.userId;
            me.ruleForm.medProjectId=me.tester.medProjectId;
            me.$nextTick(()=>{
              me.$refs.bs.loadData();
            });
        })
        .finally(()=>{
          me.testerLoading=false;
        });
      },
      onConfirm() {
        var me=this;
        me.$refs.ruleForm.validate((valid) => {
          if (valid) {
              var me = this;
              me.loading=true;
              if(me.id===0){
                axios.post(apiConfig.crf_create,utility.toServerModel(me.ruleForm)).then(response=>{
                  me.$emit("confirm",response.data);
                })
                .finally(()=>{
                  me.loading=false;
                });
              }
              else{
                axios.put(apiConfig.crf_update,utility.toServerModel(me.ruleForm)).then(response=>{
                  me.$emit("confirm",me.ruleForm);
                })
                .finally(()=>{
                  me.loading=false;
                });
              }
          }
          return valid;
        });
      }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id!=="0"){
          me.id = parseInt(me.$route.query.id);
          me.loadData();
        }
        else{
          me.getTestByCRF();
        }
    }
  }
</script>