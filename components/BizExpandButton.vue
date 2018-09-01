<template>
    <div class="btnExpandButton" :class="[expandCssName]" @click="onToggle">
        <div class="top"></div>
        <div class="middle"></div>
        <div class="bottom"></div>
    </div>
</template>
<script>
export default {
    props:{
        value:{
            type:Boolean,
            default:false
        },
        left:{
            type:Boolean,
            default:false
        },
        right:{
            type:Boolean,
            default:false
        },
        collapse:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        value(val,oldVal){
            this.val = val;
            this.expand(val);
        },
        left(val,oldVal){
            this.left = val;
        },
        right(val,oldVal){
            this.right = val;
        },
        collapse(val,oldVal){
            this.collapse=val;
        }
    },
    data(){
        return {
            val:false,
            expandCssName:""
        };
    },
    methods:{
        onToggle(){
            this.val=!this.val;
            this.$emit("input",this.val);
            this.$emit("click",this.val);
            this.expand(this.val);
        },
        expand(val){
            if(val){
                if(this.right){
                    this.expandCssName="right"
                }
                else if(this.left){
                    this.expandCssName="left";
                }
                else if(this.collapse) {
                    this.expandCssName="collapse"
                }
            }
            else
            {
                this.expandCssName="";
            }
        }
    },
    mounted(){
        this.val = this.value;
        this.expand(this.val);
    }
}
</script>
<style scoped>
    .btnExpandButton{
        display: inline-block;
        position: relative;
        width:14px;
        height:14px;
        cursor: pointer;
    }

    .btnExpandButton > div{
        position: absolute;
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 2px;
        background-color: #919bb0;
        transition: all 0.5s ease-in-out;
    }

    .btnExpandButton > .top{
        top:0;
        left: 0;
        transform:translate(0,0);
    }

    .btnExpandButton > .middle{
        top:50%;
        left:0;
        transform: translateY(-50%);
    }

    .btnExpandButton >.bottom{
        bottom: 0;
        left:0;
        transform:translate(0,0);
    }

    .btnExpandButton.right > .top{
        transform: rotate(45deg) translate(50%);
        width: 70%;
    }

    .btnExpandButton.right > .bottom{
        transform: rotate(-45deg) translate(50%);
        width: 70%;
    }

    .btnExpandButton.left > .top{
        transform: rotate(-45deg) translate(-50%);
        width: 70%;
    }

    .btnExpandButton.left > .bottom{
        transform: rotate(45deg) translate(-50%);
        width: 70%;
    }
    
    .btnExpandButton.collapse > .top{
        top:50%;
        margin-top:-4px;
        height: 4px;
        transform: translateY(-50%);
    }

    .btnExpandButton.collapse > .middle{
        height: 4px;
    }

    .btnExpandButton.collapse > .bottom{
        bottom:50%;
        margin-bottom:-8px;
        height: 4px;
        transform: translateY(-50%);
    }
</style>
