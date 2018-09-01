<template>
    <div>
        <biz-select-tree :src="urls.organization_get_by_name" :params="{organizationName:'赛诺多中心'}" value-field="id" display-field="displayName" :show-columns="['displayName']" v-model="ruleForm.organizationId" placeholder="选择组织" :modelMap="m=>m.result.items"/>
        <biz-select-tree :src="urls.permission_get" v-model="ruleForm.permissionId" placeholder="选择权限" value-field="name" display-field="displayName" :show-columns="['displayName']" children-field="_children" :modelMap="m=>m.result"/>
        <div>
            <el-button @click="onGet">显示数据</el-button>
            <el-button @click="onSet">设置数据</el-button>
        </div>
    </div>
</template>
<script>
import BizSelectTree from "~/components/BizSelectTree.vue"
import apiConfig from "~/static/apiConfig"

export default {
    components:{
        'biz-select-tree':BizSelectTree
    },
    data(){
        return {
            urls:apiConfig,
            ruleForm:{
                organizationId:null,
                permissionId:null
            }
        };
    },
    methods:{
        onGet() {
            this.$alert(JSON.stringify(this.ruleForm));
        },
        onSet(){
            this.ruleForm= {
                organizationId:null,
                permissionId:null
            };
        }
    }
}
</script>

<style>

</style>
