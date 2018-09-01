<template>
    <div>
        <el-button @click="onShow">显示</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        onShow(){
            this.$alert("show");
        }
    }
}
</script>
