<template>
    <el-form ref="form" :model="ruleForm" v-loading="loading" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="ruleForm.name" placeholder="输入组织名称200字以内" :max=200 autofocus></el-input>
        </el-form-item>
        <el-form-item label="路径">
            <el-input v-model="ruleForm.url" placeholder="页面路径" ></el-input>
        </el-form-item>
        <el-form-item label="图标">
            <biz-select-icon src="/data/icons.json" value-field="name" display-field="name" icon-field="name" v-model="ruleForm.icon" placeholder="选择图标"/>
        </el-form-item>
        <el-form-item label="权限">
            <biz-select-tree :src="urls.permission_get" v-model="ruleForm.perm" placeholder="选择权限" value-field="name" display-field="displayName" :show-columns="['displayName']" children-field="_children" :modelMap="m=>m.result"/>
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
import BizSelectIcon from "~/components/BizSelectIcon.vue"
import BizSelectTree from "~/components/BizSelectTree.vue"

export default {
  components:{
    'biz-select':BizSelect,
    'biz-select-icon':BizSelectIcon,
    'biz-select-tree':BizSelectTree
  },
  data: () => ({
    id: 0,
    loading:false,
    urls:apiConfig,
    ruleForm: {
      "parentId": 0,
      "name": "",
      "icon": "",
      "perm": "",
      "url": ""
    },
    rules:{

    }
  }),
  methods: {
    onConfirm() {
      var me = this;
      if(me.id === 0){
        axios.post(apiConfig.menu_create, me.ruleForm).then(response => {
          me.$emit("confirm", response.data.result);
        });
      }else{
        axios.put(apiConfig.menu_update, me.ruleForm).then(response => {
          me.$emit("confirm", response.data.result);
        });
      }
    },
    loadData() {
      var me = this;
      me.loading=true
      axios.get(apiConfig.menu_read, { params:{ id: me.id }})
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