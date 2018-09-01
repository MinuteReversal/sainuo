<template>
    <div v-loading="loading">
        <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="basic">
        <el-form ref="userForm" status-icon :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item label="用户名" props="userName">
                <el-input v-model="ruleForm.userName" clearable :max="50" placeholder="输入50字以内"></el-input>
            </el-form-item>
            <el-form-item label="姓氏" props="surname">
                <el-input v-model="ruleForm.surname" clearable :max="50" placeholder="输入50字以内"></el-input>
            </el-form-item>
            <el-form-item label="名字" props="name">
                <el-input v-model="ruleForm.name" clearable :max="50" placeholder="输入50字以内"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" props="emailAddress">
                <el-input v-model="ruleForm.emailAddress" clearable placeholder="输入电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" props="phoneNumber">
                <el-input v-model="ruleForm.phoneNumber" clearable :max="11" placeholder="输入11位手机号码"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" props="password" v-if="id===0">
                <el-input v-model="ruleForm.password" clearable placeholder="不输入默认gl123456"></el-input>
            </el-form-item>
            <el-form-item label="" props="isActive">
                <el-checkbox v-model="ruleForm.isActive">启用</el-checkbox>
            </el-form-item>
            <el-form-item label="" props="canBindWechat">
                <el-checkbox v-model="ruleForm.canBindWechat">允许绑定微信</el-checkbox>
            </el-form-item>
        </el-form>
        </el-tab-pane>
        <el-tab-pane label="角色" name="role">
            <el-form label-width="80px">
                <el-checkbox-group v-model="ruleForm.roles">
                    <el-checkbox v-for="role in rolescheck" :key="role.name" :label="role.name" :checked="ruleForm.roles.includes(role.id)" >{{role.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="组织机构" name="orgnization">
            <biz-select-tree :src="urls.organization_get_by_name" :params="{organizationName:'赛诺多中心'}" value-field="id" display-field="displayName" :show-columns="['displayName']" v-model="ruleForm.organizationId" placeholder="选择组织" :modelMap="m=>m.result.items"/>
        </el-tab-pane>
        <div class="text-align-right">
        <el-button @click="onCancel">取消</el-button>
        <el-button @click="onConfirm" type="primary">保存</el-button>
        </div> 
    </el-tabs>
    </div>
</template>
<script>
import apiConfig from "~/static/apiConfig"
import axios from "axios"
import BizSelectTree from "~/components/BizSelectTree"

export default {
    components:{
        BizSelectTree
    },
  data: () => (
{
    id:0,
    loading:false,
    urls:apiConfig,
    activeName:"basic",
    rolescheck:[],
    orgnizationList:[],
    props:{
      label:"displayName",
      children:"children"
    },
    ruleForm: {
      userName: "",
      surname: "",
      name: "",
      password:"",
      emailAddress: "",
      isActive: true,
      fullName: "",
      roles: [],
      organizationId: null,
      id: 0
    },
    rules: {
      userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
      ],
      name: [
        { required: true, message: "请输入姓名", trigger: "change" },
        { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
      ],
      emailAddress:[
        { required: true, message: "请输入电子邮箱", trigger: "change" },
        { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
      ],
      phoneNumber:[
        { required: true, message: "请输入手机号码", trigger: "change" },
        { min: 11, max: 11, message: "长度在 2 到 50 个字符", trigger: "blur" }
      ]
    }
}
  ),
  methods: {
        treeToList(nodes,level){
            var me=this;
            var list=[];
            for(var i=0,node;node=nodes[i];i++){
                list.push(node);
                if(node.children.length){
                list = list.concat(me.treeToList(node.children,level++));
                }
            }
            return list;
        },
        onConfirm(){
            var me = this;
            var url= me.id===0 ?apiConfig.user_create : apiConfig.user_update;
            me.loading=true;
            axios.post(url,me.ruleForm)
            .then(response=>{  
            me.$emit("confirm",me.ruleForm);
            })
            .finally(()=>{
                me.loading=false;
            });
        },
        onCancel(){
            this.$emit("cancel");
        },
        loadData(){
            var me=this;
            me.loading=true;
            axios.post(apiConfig.user_get,{ id:me.id})
            .then(response=>{
                me.ruleForm = response.data.result;
            })
            .finally(()=>{
                    me.loading=false;
            });
        },
        loadRoles(){
            var me=this;
            me.loading=true;
            axios.post(apiConfig.role_all_get,{
            skipCount:0,
            maxResultCount:65536
            })
            .then(response=>{
                me.rolescheck = response.data.result.items;
            })
            .finally(()=>{
                    me.loading=false;
            });
        }
  },
  mounted(){
    var me = this;
    if(typeof me.$route.query.id === "string" && me.$route.query.id!=="0"){
      me.id = parseInt(me.$route.query.id);
      me.loadData();
    }
    me.loadRoles();
  }
};
</script>
