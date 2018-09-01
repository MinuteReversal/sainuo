<template>
    <el-form ref="form" :model="ruleForm" v-loading="loading" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="ruleForm.projectName" placeholder="输入组织名称200字以内" :max=200 autofocus></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <ckeditor v-model="ruleForm.projectDescription" height="300px"/>
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
import CKEditor from "~/components/CKEditor4.vue"
export default {
  components:{
    'ckeditor':CKEditor
  },
  data: () => ({
    id: 0,
    loading:false,
    ruleForm: {
      id:0,
      projectName: "",
      projectDescription: ""
    }
  }),
  methods: {
    onConfirm() {
      var me = this;
      if(me.id === 0){
        axios.post(apiConfig.project_create, me.ruleForm).then(response => {
          me.$emit("confirm", response.data.result);
        });
      }else{
        axios.put(apiConfig.project_update, me.ruleForm).then(response => {
          me.$emit("confirm", response.data.result);
        });
      }
    },
    loadData() {
      var me = this;
      me.loading=true
      axios
      .get(apiConfig.project_read, { params:{ id: me.id }})
      .then(response => {
        me.ruleForm = response.data.result;
      })
      .finally(()=>{
        me.loading=false;
      });
    }
  },
  mounted() {
    var me = this;
    let q = me.$route.query;
    if (typeof q.id === "string" && q.id !== "0") {
      me.id = parseInt(q.id);
      me.loadData();
    }
    if (typeof q.parentId === "string" && q.parentId !== "0") {
      me.ruleForm.parentId = parseInt(me.$route.query.parentId);
    }
  }
};
</script>