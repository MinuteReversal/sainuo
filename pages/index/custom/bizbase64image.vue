<template>
    <el-form class="padding-l">
        <el-form-item>
            <biz-base64-image v-model="ruleForm.image1"></biz-base64-image>
        </el-form-item>  
        <el-form-item>
            <biz-base64-image :preview="false" v-model="ruleForm.image2"></biz-base64-image>
            <div>
                <img :src="ruleForm.image2"/>
            </div>
        </el-form-item>
        <div class="text-align-right">
            <el-button @click="onGet">显示</el-button>
            <el-button @click="onSet">设置</el-button>
        </div>
    </el-form>
</template>
<script>
import BizBase64Image from "~/components/BizBase64Image.vue"

export default {
    components:{
        "biz-base64-image":BizBase64Image
    },
    data(){
        return {
            ruleForm:{
                image1:"",
                image2:""
            }
        };
    },
    methods:{
        onSet(){
            this.ruleForm={
                image1:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA8CAYAAAA+CQlPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUMSURBVGhD5ZtNaFxVFMfvuTMxIxTsotOZLiQtSd6b1AgtdFtoFi4KXVTQhWBWbgpWmqCQhQtxUVx00YIFFV0IttBFF90Ihbqo4EJQsIvQzFeIotbOpIuKgqnN3OM545nQSebj3Ttz30wmv0XePfdN3nv/87/3vI95A2oArISZwxrxY9r5PkRcDEvr92RVbGhZxgqJvgQAZxTAKVp+Lt2xErvjhen0MdD6JwnrGMRXc8XqLQljIXbHSfQH0txCA+zo802sjueDQzkNZkXCJtDgK2Gp+o2E3onVca1qS9LcAYB6X5qxEJvjpcn0FCb0Cu0xKV07oIOZmy5U7krolfgcT+q3O4lmUKkL0vROLI4vH01nx2qwBgpS0tUWNOZ4HOf1WBwfr+mlKKKZVlXfB94dt3G7QRyue3fcxu0Gcbju1XEXtxv4dt2r4y5uN/DtujfH6SrtAEDtV1fhzCaol4/mK8sS9hVvjgOY872IZpIG35Vm3/Hi+NrEC/v/TaVobqv90uUGkuk1MzO9ul6Wnr7hxXESvdCzaIau9DABXq7h++74/VxmNmnUHdpyVrp6AhVuGKVPzhQe/ihdfcFJOJ+mqGLn6KByCmGStjKlEKeQlr3O67bQsFeAZURVpvv3sjFqlTrzgGP5oPz7b/KpyLQVzlVZ69oU7WA2AWrSIIkCIIEkEtQ++dhQwKMCKCFUUcsU0BJXDeLyZlKVZ++vP5SPNVEXvhJmT2iFZ0BhyMKQBPZljg4DqP4mlTRSsEyjMa80fh3kq99DMchcohXvycf2CHhD07w8K9Gege77z9LpzHwm8Z6BpvEX9TleCjNfURberPeOODTXbz44VH2jfgEzXajMUwau1NeMMA3Rc9/ybcAzkPOXyfkFCUeKZ0Vz3CScGUXx20UzO4QzoyS+lWimpXBmFMS3E820Fc7sZvGdRDMdhTO7UXw30UxX4cxuEh9FNBPpQQSd5xcpQ7vgPI9Xo4hmIjneYJidZ2PYIAm7YvXoiTdMwj+UcGiwFc1YOd4gHxxc0ACXJRwoLqIZJ+FMIch8AqDOSTgobgeFymlpW+HlKWtcUAXvWsTa0YvwY7IcGKDghDStcRZOc2RWmoMDVJa/vJDICifh/HiZdjoUT1qfPj+ek6YVTsKTm4Mf5lug27E4DnVwyrIPaJ6H0rTCSbjrznxAF1ROtcZNOAxBYdsC4xzqODRDnWw4UC+2llgL5+/UeGcSDgUuxdbB8U3niwZ/2Bdba+H9mt9UlB7Tn5bfZNriUmzthSO8JE0nWDDf2j5NmBfHnqSOGMTFXhPgYob13VkxOPgD7cl6uPN32FrBpzXUF3PFPx5Jdx15Z4YfcFygA3K4BMVHQaGaliASDsIzf9F/2V2uIn4JNbzY7SUeedNiCVGdp310fNN5OwZ1entCO2ElnH89lCCDJOwO4l26dbT+lRG/224S8BEAvCZdXSEhVu+6W81xwMgXC/cMmtNBsTrn8lomj4ywWH2dtnGSkyfdHeFXVqQZCcvi1vm0QUWrTMVqPihUjueK67el2xnaxnecPE4ihZ0TCMqq6FoJ1/yOTCuoKqNR7zzIVmZyxeo16e0bnEROJieVkyvdTVBlPyzNSNgNdYCmgtM4NfFpKSxVrkZ5nt0LnFROLid5+ynQ9jGUVXErhZlTVHHvIKifKbz+3MbGlSO//Pn4/7XxsjYxkXoy/s85cu4tnoJ0XPOU/BuyugtK/QdPrgL8zwsPlwAAAABJRU5ErkJggg==",
                image2:"",
            }
        },
        onGet(){
            this.$alert(JSON.stringify(this.ruleForm));
        }
    }
}
</script>

