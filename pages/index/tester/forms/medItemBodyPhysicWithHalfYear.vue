<template>
    <div v-loading="loading">
        <div><h2>体格检查（肝纤维化检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <h3>体格检查</h3>
                <div>
                    <span>检查日期</span>
                    <el-date-picker class="margin-left-xl" type="date" placeholder="选择日期" v-model="ruleForm.testDate"></el-date-picker>
                </div>   
            </div>
            <div>
                <h3>全身各系统</h3>
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
            <h3>过去六个月内是否用过与治疗慢性乙型肝炎无关的药物？</h3>
            <div>
                <el-radio v-model="ruleForm.halfYearMedTake" :label="false">否</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.halfYearMedTake" :label="true">是</el-radio>
            </div>
            <div v-if="ruleForm.halfYearMedTake">
                <div v-for="(item,index) in ruleForm.halfYearMedObjectFromJson" :key="index">
                    <el-form-item label="通用名称">
                        <el-input  v-model="item.commonName" placeholder="请输入药物通用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="适应症">
                        <el-input  v-model="item.userFor" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入适应症"></el-input>
                    </el-form-item>
                    <el-form-item label="发生与结束日期">
                        <el-date-picker v-model="item.time" @change="onTimeChange(item)" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="正在应用">
                        <el-radio v-model="item.isCurrentlyUsed" class="radio" :label="true">是</el-radio>
                        <el-radio v-model="item.isCurrentlyUsed" class="radio" :label="false">否</el-radio>
                    </el-form-item>
                    <el-form-item label="操作">
                        <el-button size="small" type="danger" icon="el-icon-delete"  @click="onDelete(item,index)">删除</el-button>
                    </el-form-item>
                </div>
                <el-button size="large" @click="onAdd" icon="el-icon-plus" class="col-12">添加药物</el-button>
            </div>
            <div class="clear"></div>
            <div class="text-align-right margin-top-xl">
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
            loading:true,
            ruleForm:{
                "id": 0,
                "crfBasicId": 0,
                "testDate": new Date(),
                "wg": 0,
                "wgDes": "string",
                "hx": 0,
                "hxDes": "string",
                "xh": 0,
                "xhDes": "string",
                "xiaoHua": 0,
                "xiaoHuaDes": "string",
                "mn": 0,
                "mnDes": "string",
                "jrgg": 0,
                "jrggDes": "string",
                "sj": 0,
                "sjDes": "string",
                "nfmdx": 0,
                "nfmdxDes": "string",
                "xylb": 0,
                "xylbDes": "string",
                "pf": 0,
                "pfDes": "string",
                "gmmy": 0,
                "gmmyDes": "string",
                "other": 0,
                "otherDes": "string",
                "halfYearMedTake": false,
                "halfYearMedObjectFromJson": []
            },
            rules: {
            }
        };
    },
    methods: {
        onTimeChange(item){
            item.startTime=item.time[0];
            item.endTime=item.time[1];
        },
        onAdd() {
            let me = this;
            me.ruleForm.halfYearMedObjectFromJson.push({
                    "commonName": "",
                    "userFor": "",
                    "isCurrentlyUsed":false,
                    "time":new Date(),
                    "startTime": new Date(),
                    "endTime": new Date()
                    });
        },
        onDelete(item,index){
            let me=this;
            me.$confirm(`确定删除${item.commonName}?`).then(response=>{
                me.ruleForm.halfYearMedObjectFromJson.splice(index,1);
            });
        },
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemBodyPhysicWithHalfYear_get,{ params:{ id:me.id}})
            .then(response=>{
                me.ruleForm = utility.toClientModel(me.unwrap(response.data.result));
            })
            .finally(()=>{
                me.loading=false;
            });
        },
        unwrap(model){
            for(var i=0,item;item=model.halfYearMedObjectFromJson[i];i++){
                item.time=[item.startTime,item.endTime];   
            }
            return model;
        },
        warp(model){
            for(var i=0,item;item=model.halfYearMedObjectFromJson[i];i++){
                if(item.time instanceof Array){
                    item.startTime=item.time[0],
                    item.endTime=item.time[1]
                }
            }
            return model;
        },
        onConfirm() {
            var me = this;
            me.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    var me = this;
                    me.loading=true;
                    axios.put(apiConfig.medItemBodyPhysicWithHalfYear_put,utility.toServerModel(me.warp(me.ruleForm)))
                    .then(response => {
                        me.$emit("confirm", response.data.result);
                    })
                    .finally(() => {
                        me.loading = false;
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