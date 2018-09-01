<template>
<div>
    <div>
        <biz-tag v-model="ruleForm.data1" src="/data/tags.json" remote></biz-tag>
    </div>
    <div>
        <biz-tag v-model="ruleForm.data2" ></biz-tag>
    </div>
    <div>
        <biz-tag v-model="ruleForm.data3" src="/data/tagObjs.json" remote display-field="name" value-field="id" ></biz-tag>
    </div>
    <div>
        <biz-tag disabled v-model="ruleForm.data3" src="/data/tagObjs.json" remote display-field="name" value-field="id" ></biz-tag>
    </div>
    <div>
        <el-button @click="onGet">显示数据</el-button>
        <el-button @click="onSet">设置数据</el-button>
    </div>
</div>
</template>
<script>
import BizTag from "~/components/BizTag.vue"
export default {
    components:{
        'biz-tag':BizTag
    },
    data(){
        return{
            ruleForm:{
                data1:['黄'],
                data2:["张三","李四","王五"],
                data3:[4]
            }
        };
    },
    methods:{
        onGet(){
            this.$alert(JSON.stringify(this.ruleForm));
        },
        onSet(){
            this.ruleForm={
                data1:["紫"],
                data2:["李四"],
                data3:[1,2,3]
            }
        }
    },
    mounted(){
        window.vm=this;
    }
}
</script>

