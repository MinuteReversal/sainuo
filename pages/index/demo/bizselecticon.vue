<template>
    <div>
        <biz-select-icon src="/data/icons.json" value-field="id" display-field="name" icon-field="name" v-model="ruleForm.icon" placeholder="选择图标"/>
        <div>
            <el-button @click="onGet">显示数据</el-button>
            <el-button @click="onSet">设置数据</el-button>
        </div>
    </div>
</template>
<script>
import BizSelectIcon from "~/components/BizSelectIcon.vue"
import apiConfig from "~/static/apiConfig"

export default {
    components:{
        'biz-select-icon':BizSelectIcon
    },
    data(){
        return {
            ruleForm:{
                icon:3
            }
        };
    },
    methods:{
        onGet() {
            this.$alert(JSON.stringify(this.ruleForm));
        },
        onSet(){
            this.ruleForm= {
                icon:4
            };
        }
    }
}
</script>

<style>

</style>
