<template>
    <div v-loading="loading">
        <div><h2>体格检查（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <h2>体格检查</h2>
                <div>
                    <span>检查日期</span><el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.testDate"></el-date-picker>
                </div>
            </div>
            <div>
                <h2>全身各系统</h2>
                <el-form-item label="1、五官">
                    <el-radio v-model="ruleForm.wg" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.wg" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.wg" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.wg===2">
                    <el-input v-model="ruleForm.wgDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="2、呼吸">
                    <el-radio v-model="ruleForm.hx" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.hx" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.hx" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.hx===2">
                    <el-input v-model="ruleForm.hxDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="3、循环">
                    <el-radio v-model="ruleForm.xh" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.xh" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.xh" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.xh===2">
                    <el-input v-model="ruleForm.xhDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="4、消化">
                    <el-radio v-model="ruleForm.xiaoHua" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.xiaoHua" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.xiaoHua" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.xiaoHua===2">
                    <el-input v-model="ruleForm.xiaoHuaDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="5、泌尿">
                    <el-radio v-model="ruleForm.mn" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.mn" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.mn" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.mn===2">
                    <el-input v-model="ruleForm.mnDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="6、肌肉骨骼">
                    <el-radio v-model="ruleForm.jrgg" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.jrgg" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.jrgg" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.jrgg===2">
                    <el-input v-model="ruleForm.jrggDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="7、神经">
                    <el-radio v-model="ruleForm.sj" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.sj" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.sj" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.sj===2">
                    <el-input v-model="ruleForm.sjDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="8、内分泌和代谢">
                    <el-radio v-model="ruleForm.nfmdx" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.nfmdx" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.nfmdx" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.nfmdx===2">
                    <el-input v-model="ruleForm.nfmdxDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="9、血液/淋巴">
                    <el-radio v-model="ruleForm.xylb" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.xylb" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.xylb" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.xylb===2">
                    <el-input v-model="ruleForm.xylbDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="10、皮肤">
                    <el-radio v-model="ruleForm.pf" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.pf" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.pf" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.pf===2">
                    <el-input v-model="ruleForm.pfDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="11、过敏/免疫">
                    <el-radio v-model="ruleForm.gmmy" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.gmmy" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.gmmy" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.gmmy===2">
                    <el-input v-model="ruleForm.gmmyDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
                <el-form-item label="12、其他">
                    <el-radio v-model="ruleForm.other" :label="0">未做</el-radio>
                    <el-radio v-model="ruleForm.other" :label="1">正常</el-radio>
                    <el-radio v-model="ruleForm.other" :label="2">异常</el-radio>
                </el-form-item>
                <div v-if="ruleForm.other===2">
                    <el-input v-model="ruleForm.otherDes" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="异常情况描述（如有异常，尽可能写出诊断）" ></el-input>  
                </div>
            </div>
            <div class="text-align-right">
                <el-button @click="$emit('cancel')">取消</el-button>
                <el-button @click="onConfirm" type="primary">保存</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import utility from "~/static/javascript/utility"

export default {
    data() {
        return {
            id:0,
            ruleForm:{
                "id": 0,
                "crfBasicId": 0,
                "testDate": new Date(),
                "wg": 0,
                "wgDes": "",
                "hx": 0,
                "hxDes": "",
                "xh": 0,
                "xhDes": "",
                "xiaoHua": 0,
                "xiaoHuaDes": "",
                "mn": 0,
                "mnDes": "",
                "jrgg": 0,
                "jrggDes": "",
                "sj": 0,
                "sjDes": "",
                "nfmdx": 0,
                "nfmdxDes": "",
                "xylb": 0,
                "xylbDes": "",
                "pf": 0,
                "pfDes": "",
                "gmmy": 0,
                "gmmyDes": "",
                "other": 0,
                "otherDes": ""
                },
            rules: {
            }
        };
    },
    methods: {
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemBodyPhysicWithHalfYear_get,{ params:{ id:me.id}})
            .then(response=>{
                me.ruleForm = utility.toClientModel(response.data.result);
            })
            .finally(()=>{
              me.loading=false;
            });
        },
        onConfirm() {
            var me=this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    var me = this;
                    me.loading=true;
                    axios.put(apiConfig.medItemBodyPhysicWithHalfYear_put,utility.toServerModel(me.ruleForm))
                    .then(response=>{
                        me.$emit("confirm", response.data.result);
                    })
                    .finally(()=>{
                        me.loading=false;
                    });
                }
                return valid;
            });
        }
    },
    mounted(){
        var me = this;
        if(typeof me.$route.query.id === "string" && me.$route.query.id!=="0"){
            me.id = parseInt(me.$route.query.id);
            me.loadData();
        }
    }
}
</script>