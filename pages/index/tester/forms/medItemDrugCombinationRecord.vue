<template>
    <div v-loading="loading">
        <div><h2>合并用药（肝纤维化检验）</h2></div>
        <div>
            <div>自上次访视以来，是否有新的合并用药？</div>
            <el-radio class="radio" v-model="ruleForm.combinedDrugUse" :label="false">否</el-radio>
            <el-radio class="radio" v-model="ruleForm.combinedDrugUse" :label="true">是</el-radio>
        </div>
        <el-form v-if="ruleForm.combinedDrugUse" label-width="120px" class="margin-top-xl">
            <div><span>请在下面详述</span></div>
            <div v-for="(item,index) in ruleForm.combinedDrugUserRecord" :key="index">
                <el-form-item label="药物名称">
                    <el-input v-model="item.drugName" placeholder="请输入药物名称"></el-input>
                </el-form-item>
                <el-form-item label="每次用量">
                    <el-input v-model="item.quantityUse" placeholder="请输入每次用量"></el-input>
                </el-form-item>
                <el-form-item label="用药持续时间">
                    <el-date-picker v-model="item.range" @change="onUseTimeChange(item)" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="其它备注">
                  <el-input  v-model="item.otherNote" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入其它备注"></el-input>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button size="small" type="danger" icon="el-icon-delete"  @click="onDelete(item,index)">删除</el-button>
                </el-form-item>
            </div>
            <div>
                <el-button icon="el-icon-plus" @click="onAdd" class="col-12">添加合并用药记录</el-button>
            </div>
        </el-form>
        <div class="text-align-right">
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
        id: 0,
        crfBasicId: 0,
        combinedDrugUse: false,
        combinedDrugUserRecord: []
      },
      rules: {}
    };
  },
  methods: {
    onUseTimeChange(item){
      item.startUseTime=item.useTime[0];
      item.endUseTime=item.useTime[1];
    },
    onAdd() {
      let me = this;
      me.ruleForm.combinedDrugUserRecord.push({
                "drugName": "",
                "quantityUse": "",
                "useTime":[new Date(),new Date()],
                "startUseTime": new Date(),
                "endUseTime": new Date(),
                "otherNote": ""
            });
    },
    onDelete(item,index){
        let me=this;
        me.$confirm(`确定删除${item.dieaseName}?`).then(response=>{
            me.ruleForm.combinedDrugUserRecord.splice(index,1);
        });
    },
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemDrugCombinationRecord_get, { params: { id: me.id } })
        .then(response => {
          let model=utility.toClientModel(response.data.result);
          model.combinedDrugUserRecord.forEach(element=>{
            element.useTime=[
              element.startUseTime,
              element.endUseTime
            ];
          });
          me.ruleForm = model;
        })
        .finally(()=>{
              me.loading=false;
        });
    },
    warp(model){
      for(var i,item;item=model.combinedDrugUserRecord[i];i++){
        if(item.useTime instanceof Array){
          item.startUseTime=item.useTime[0];
          item.endUseTime=item.useTime[1];
        }
      }
    },
    unwrap(model){
        for(var i,item;item=model.combinedDrugUserRecord[i];i++){
          item.useTime=[item.startUseTime,item.endUseTime];
      }
    },
    onConfirm() {
      var me = this;
      me.loading=true;
      axios
        .put(
          apiConfig.medItemDrugCombinationRecord_put,
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