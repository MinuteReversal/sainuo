<template>
    <el-form ref="form" :model="ruleForm" v-loading="loading" label-width="80px">
        <el-form-item label="组织名称">
            <el-input v-model="ruleForm.displayName" placeholder="输入组织名称200字以内" :max=200 autofocus></el-input>
        </el-form-item>
        <div class="text-align-right">
          <el-button @click="$emit('cancel')">取消</el-button>
          <el-button @click="onConfirm" type="primary">保存</el-button>
        </div> 
    </el-form>
</template>
<script>
import axios from "axios";
import apiConfig from "~/static/apiConfig";
export default {
  data: () => ({
    id: 0,
    loading:false,
    ruleForm: {
      parentId: 0,
      displayName: ""
    }
  }),
  methods: {
    onConfirm() {
      var me = this;
      if(me.id === 0){
        axios.post(apiConfig.organization_create, me.ruleForm).then(response => {
          me.$emit("confirm", response.data.result);
        });
      }else{
        axios.put(apiConfig.organization_update, me.ruleForm).then(response => {
          me.$emit("confirm", response.data.result);
        });
      }
    },
    loadData() {
      var me = this;
      me.loading=true
      axios.get(apiConfig.organization_get_by_id, { params:{ organizationId: me.id }})
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