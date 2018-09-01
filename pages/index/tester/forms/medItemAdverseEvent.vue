<template>
    <div v-loading="loading">
        <div><h2>不良事件（肝纤维化检验）</h2></div>
        <el-form label-width="120px">
            <div>有不良事件？</div>
            <div>
                <el-radio v-model="ruleForm.anyAdverseEvent" :label="false">否</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.anyAdverseEvent" :label="true">是</el-radio>
            </div>
            <template v-if="ruleForm.anyAdverseEvent">
            <div>严重？</div>
            <div>
                <el-radio v-model="ruleForm.anySeriousEvent" :label="false">否</el-radio>
            </div>
            <div>
                <el-radio v-model="ruleForm.anySeriousEvent" :label="true">是</el-radio>
            </div>
            <div v-for="(item,index) in ruleForm.adEvents" :key="index" >
                <el-form-item label="不良事件名称">
                    <el-input  v-model="item.adverseEventName" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="发生与结束日期">
                    <el-date-picker v-model="item.time" @change="onTimeChange(item)" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="严重程度">
                    <el-radio class="radio" v-model="item.isSerious" :label="0">轻度</el-radio>
                    <el-radio class="radio" v-model="item.isSerious" :label="1">中度</el-radio>
                    <el-radio class="radio" v-model="item.isSerious" :label="2">重度</el-radio>
                </el-form-item>
                <el-form-item label="与试验药物治疗相关性">
                    <el-radio class="radio" v-model="item.drugRelated" :label="0">很肯定有关</el-radio>
                    <el-radio class="radio" v-model="item.drugRelated" :label="1">可能有关</el-radio>
                    <el-radio class="radio" v-model="item.drugRelated" :label="2">可能无关</el-radio>
                    <el-radio class="radio" v-model="item.drugRelated" :label="3">无关</el-radio>
                    <el-radio class="radio" v-model="item.drugRelated" :label="4">无法判定</el-radio>
                </el-form-item>
                <el-form-item label="对研究药物的影响">
                    <el-radio class="radio" v-model="item.researchRelated" :label="0">无影响</el-radio>
                    <el-radio class="radio" v-model="item.researchRelated" :label="1">调整治疗</el-radio>
                    <el-radio class="radio" v-model="item.researchRelated" :label="2">中断治疗</el-radio>
                    <el-radio class="radio" v-model="item.researchRelated" :label="3">中止治疗</el-radio>
                </el-form-item>
                <el-form-item label="对不良时间采取的措施">
                    <el-radio class="radio" v-model="item.undertake" :label="0">未采取措施</el-radio>
                    <el-radio class="radio" v-model="item.undertake" :label="1">药物治疗</el-radio>
                    <el-radio class="radio" v-model="item.undertake" :label="2">非药物性治疗</el-radio>
                    <el-radio class="radio" v-model="item.undertake" :label="3">住院</el-radio>
                </el-form-item>
                <el-form-item label="结果">
                    <el-radio class="radio" v-model="item.result" :label="0">已恢复/解决</el-radio>
                    <el-radio class="radio" v-model="item.result" :label="1">恢复/解决中</el-radio>
                    <el-radio class="radio" v-model="item.result" :label="2">未恢复/解决</el-radio>
                    <el-radio class="radio" v-model="item.result" :label="3">已恢复/解决伴有后遗症</el-radio>
                    <el-radio class="radio" v-model="item.result" :label="4">致命的</el-radio>
                    <el-radio class="radio" v-model="item.result" :label="5">未知的</el-radio>
                </el-form-item>
                <el-form-item label="受试者是否因为此不良事件而退出治疗或研究">
                    <el-radio class="radio" v-model="item.patientQuit" :label="0">是</el-radio>
                    <el-radio class="radio" v-model="item.patientQuit" :label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="" class="text-align-right">
                    研究者：当前账号用户名
                </el-form-item>    
                <el-form-item label="">
                    时间：当前系统时间
                </el-form-item>    
                <el-form-item label="操作">
                    <el-button size="small" type="danger" icon="el-icon-delete"  @click="onDelete(item,index)">删除</el-button>
                </el-form-item>
            </div>
            <div class="margin-top-xl">
                <el-button icon="el-icon-plus" @click="onAdd" class="col-12">添加不良事件</el-button>
            </div>
        </template>
        </el-form>
        <div class="clear"></div>
        <div class="text-align-right margin-top-xl">
            <el-button @click="$emit('cancel')">取消</el-button>
            <el-button @click="onConfirm" type="primary">保存</el-button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import apiConfig from "~/static/apiConfig";
import utility from "~/static/javascript/utility";

export default {
  data() {
    return {
      id: 0,
      loading:false,
      ruleForm: {
            "crfBasicId": 0,
            "anyAdverseEvent": false,
            "anySeriousEvent":false,
            "adEvents": [],
            "id": 0
        },
        rules: {}
    };
  },
  methods: {
    onTimeChange(item){
      item.startTime=item.time[0];
      item.endTime=item.time[1];
    },
    onAdd() {
      let me = this;
      me.ruleForm.adEvents.push({
            "adverseEventName": "",
            "isSerious": true,
            "time":[new Date(),new Date()],
            "startTime": new Date(),
            "endTime": new Date(),
            "drugRelated": 0,
            "researchRelated": 0,
            "undertake": 0,
            "result": 0,
            "patientQuit": true
      });
    },
    onDelete(item,index){
        let me=this;
        me.$confirm(`确定删除${item.adverseEventName}?`).then(response=>{
            me.ruleForm.adEvents.splice(index,1);
        });
    },
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemAdverseEvent_get, { params: { id: me.id } })
        .then(response => {
           let model=utility.toClientModel(response.data.result);
            model.adEvents.forEach(element=>{
                element.time=[
                    element.startTime,
                    element.endTime
                ];
            });
            me.ruleForm = model;            
        })
        .finally(()=>{
            me.loading=false;
        });
    },
    onConfirm() {
      var me = this;
      me.loading=true;
      axios
        .put(
          apiConfig.medItemAdverseEvent_put,
          utility.toServerModel(me.ruleForm)
        )
        .then(response => {
          me.$emit("confirm", response.data.result);
        })
        .finally(()=>{
            me.loading=false;
        });
    }
  },
  mounted() {
    var me = this;
    if (typeof me.$route.query.id === "string" && me.$route.query.id !== "0") {
      me.id = parseInt(me.$route.query.id);
      me.loadData();
    }
  }
};
</script>