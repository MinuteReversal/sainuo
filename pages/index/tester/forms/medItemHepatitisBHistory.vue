<template>
    <div v-loading="loading">
        <div><h2>乙肝病史（肝龙核苷酸检验）</h2></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
            <div>
                <h2>乙肝病史</h2>
                患者确诊患有慢性乙肝的日期
                <el-date-picker class="margin-left-xl" type="date" placeholder="选择日期" v-model="ruleForm.confirmedDate"></el-date-picker>
            </div>
            <div>
                <el-alert show-icon title="排除标准" type="info" description="Fibro-Touch检测值＞17.5kPa的患者（如肝组织活检证实为非肝硬化者除外）；或病理组织学检查为肝硬化的患者。"></el-alert>
                <h2>患者是否确诊患有肝硬化</h2>
                <div>
                    <el-radio v-model="ruleForm.hasHepatocirrhosis" :label="true">是</el-radio>
                    <el-alert title="若“是”不符合入选标准" type="error" center show-icon></el-alert>
                </div>
                <div>
                    <el-radio v-model="ruleForm.hasHepatocirrhosis" :label="false">否</el-radio>
                </div>
            </div>
            <div>
                <h2>乙肝治疗史</h2>
                <div>
                    <div>曾经使用核苷类似物的种类（选择其中一项或多项）：</div>
                    <div>
                        <el-checkbox v-model="ruleForm.etkw">恩替卡韦</el-checkbox>
                        <el-checkbox v-model="ruleForm.lfmd">拉米夫定</el-checkbox>
                        <el-checkbox v-model="ruleForm.adfw">阿德福韦</el-checkbox>
                        <el-checkbox v-model="ruleForm.tnfw">替诺福韦</el-checkbox>
                        <el-checkbox v-model="ruleForm.tbfd">替比夫定</el-checkbox>
                    </div>
                </div>
                <div>
                    <div>目前使用核苷类似物的种类和持续时间：</div>
                    <div v-if="ruleForm.etkw">
                        <el-checkbox v-model="ruleForm.cetkw">
                        <span>恩替卡韦</span>
                        </el-checkbox>
                        <el-date-picker class="margin-left-xl" v-model="ruleForm.etkwDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </div>
                    <div v-if="ruleForm.lfmd">
                        <el-checkbox v-model="ruleForm.clfmd">
                        <span>拉米夫定</span>
                        </el-checkbox>
                        <el-date-picker class="margin-left-xl" v-model="ruleForm.lfmdDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </div>
                    <div v-if="ruleForm.adfw">
                        <el-checkbox v-model="ruleForm.cadfw">
                        <span>阿德福韦</span>
                        </el-checkbox>
                        <el-date-picker class="margin-left-xl" v-model="ruleForm.adfwDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </div>
                    <div v-if="ruleForm.tnfw">
                        <el-checkbox v-model="ruleForm.ctnfw">
                        <span>替诺福韦</span>
                        </el-checkbox>
                        <el-date-picker class="margin-left-xl" v-model="ruleForm.tnfwDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </div>
                    <div v-if="ruleForm.tbfd">
                        <el-checkbox v-model="ruleForm.ctbfd">
                        <span>替比夫定</span>
                        </el-checkbox>
                        <el-date-picker class="margin-left-xl" v-model="ruleForm.tbfdDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </div>
                </div>
                <div>其他抗病毒药物？</div>
                <div>
                    <el-radio v-model="ruleForm.otherMed" :label="false">无</el-radio>
                </div>
                <div>
                    <div><el-radio v-model="ruleForm.otherMed" :label="true">有</el-radio></div>
                    <el-input v-if="ruleForm.otherMed" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入药物名称" v-model="ruleForm.otherMedNames"></el-input>
                </div>
            </div>
            <div>
                <h2>家族史</h2>
                <div>家中有无乙肝病毒感染者，或者家族内母亲和/或亲兄弟姊妹HBsAg阳性：</div>
                <div>
                    <el-radio v-model="ruleForm.familyInfected" :label="false">无</el-radio>
                    <el-alert title="若“是”不符合入选标准" type="error" center show-icon></el-alert>
                </div>
                <div>
                    <el-radio v-model="ruleForm.familyInfected" :label="true">有</el-radio>
                    <template v-if="ruleForm.familyInfected">
                        <div>与患者亲属关系:</div>
                        <el-select v-model="ruleForm.familyRelation" placeholder="母亲/或兄弟姐妹">
                            <el-option value="母亲">母亲</el-option>
                            <el-option value="兄弟姐妹">兄弟姐妹</el-option>
                        </el-select>
                    </template>
                </div>
            </div>
            <div>
                <h2>感染途径</h2>
                    <el-radio v-model="ruleForm.infactedRoute" :label="0">围产期</el-radio>
                    <el-radio v-model="ruleForm.infactedRoute" :label="1">输血</el-radio>
                    <el-radio v-model="ruleForm.infactedRoute" :label="2">经皮感染</el-radio>
                    <el-radio v-model="ruleForm.infactedRoute" :label="3">药物注射</el-radio>
                    <el-radio v-model="ruleForm.infactedRoute" :label="4">性传播</el-radio>
                    <el-radio v-model="ruleForm.infactedRoute" :label="5">未知</el-radio>
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
            loading:false,
            ruleForm:{
                "id": 0,
                "crfBasicId": 0,
                "confirmedDate": new Date(),
                "hasHepatocirrhosis": true,
                "etkw": false,
                "cetkw": false,
                "etkwDate":[new Date(),new Date()],
                "etkwBeginDate": new Date(),
                "etkwEndDate": new Date(),
                "lfmd": false,
                "clfmd": false,
                "lfmdDate":[new Date(),new Date()],
                "lfmdBeginDate": new Date(),
                "lfmdEndDate": new Date(),
                "adfw": false,
                "cadfw": false,
                "adfwDate":[new Date(),new Date()],
                "adfwBeginDate": new Date(),
                "adfwEndDate": new Date(),
                "tbfd": false,
                "ctbfd": false,
                "tbfdDate":[new Date(),new Date()],
                "tbfdBeginDate": new Date(),
                "tbfdEndDate": new Date(),
                "tnfw":false,
                "ctnfw":false,
                "tnfwDate":[new Date(),new Date()],
                "tnfwBeginDate":new Date(),
                "tnfwEndDate":new Date(),
                "otherMed": false,
                "otherMedNames": "",
                "familyInfected": true,
                "familyRelation": "",
                "infactedRoute": 0
            },
            rules: {
            }
        };
    },
    methods: {
        loadData(){
            var me=this;
            me.loading=true;
            axios.get(apiConfig.medItemHepatitisBHistory_get,{ params:{ id:me.id}}).then(response=>{
                let m=utility.toClientModel(response.data.result);                
                me.ruleForm = me.unwrap(m);
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
                    let model = utility.toServerModel(me.wrap(Object.assign({},me.ruleForm)));
                    axios.put(apiConfig.medItemHepatitisBHistory_put,model).then(response=>{
                        me.$emit("confirm", response.data.result);
                    })
                    .finally(()=>{
                        me.loading=false;
                    });
                }
                return valid;
            });
        },
        wrap(model){
            if(model.etkwDate){
                model.etkwBeginDate=model.etkwDate[0];
                model.etkwEndDate=model.etkwDate[1];
            }
            
            if(model.lfmdDate){
                model.lfmdBeginDate=model.lfmdDate[0];
                model.lfmdEndDate=model.lfmdDate[1];
            }
            
            if(model.adfwDate){
                model.adfwBeginDate=model.adfwDate[0];
                model.adfwEndDate=model.adfwDate[1];
            }
            
            if(model.tnfwDate){
                model.tnfwBeginDate=model.tnfwDate[0];
                model.tnfwEndDate=model.tnfwDate[1];
            }
            
            if(model.tbfdDate){
                model.tbfdBeginDate=model.tbfdDate[0];
                model.tbfdEndDate=model.tbfdDate[1];
            }
            
            return model;
        },
        unwrap(model){
            if(model.etkwBeginDate && model.etkwEndDate){
                model.etkwDate=[model.etkwBeginDate,model.etkwEndDate];
            }
            
            if(model.lfmdBeginDate && model.lfmdEndDate){
                model.lfmdDate=[model.lfmdBeginDate,model.lfmdEndDate];
            }

            if(model.adfwBeginDate && model.adfwEndDate){
                model.adfwDate=[model.adfwBeginDate,model.adfwEndDate];
            }

            if(model.tnfwBeginDate && model.tnfwEndDate){
                model.tnfwDate=[model.tnfwBeginDate,model.tnfwEndDate];
            }

            if(model.tbfdBeginDate && model.tbfdEndDate){
                model.tbfdDate=[model.tbfdBeginDate,model.tbfdEndDate];
            }

            return model;
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