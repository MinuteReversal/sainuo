<template>
    <div v-loading="loading">
        <div><h2>既往病史（肝纤维化检验）</h2></div>
        <div>
            <div>在过去一年里，受试者是否存在除乙肝以外的病史或既往史？</div>
            <el-radio class="radio" v-model="ruleForm.hadPastYearDiseaseHistory" :label="false">否</el-radio>
            <el-radio class="radio" v-model="ruleForm.hadPastYearDiseaseHistory" :label="true">是</el-radio>
            <span>如果“是”请在下面详述</span>
        </div>
        <div v-if="ruleForm.hadPastYearDiseaseHistory" class="margin-top-xl">
          <el-form v-for="(item,index) in ruleForm.pastDiseaseHistoryFromJson" :key="index" :inline="true" label-width="120px">
              <el-form-item :label="(index+1)+'疾病名称'">
                  <el-input v-model="item.dieaseName" placeholder="请输入疾病名称"></el-input>
              </el-form-item>
              <el-form-item label="正在治疗">
                  <el-radio class="radio" v-model="item.isTreating" :label="true">是</el-radio>
                  <el-radio class="radio" v-model="item.isTreating" :label="false">否</el-radio>
              </el-form-item>
              <el-form-item label="">
                  <el-button size="small" type="danger" icon="el-icon-delete"  @click="onDelete(item,index)">删除</el-button>
              </el-form-item>
          </el-form>
        </div>
        <div class="margin-top-xl">
            <el-button icon="el-icon-plus" @click="onAdd" class="col-12">添加病史</el-button>
        </div>
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
        id: 0,
        crfBasicId: 0,
        hadPastYearDiseaseHistory: false,
        pastDiseaseHistoryFromJson: []
      },
      rules: {}
    };
  },
  methods: {
    onAdd() {
      let me = this;
      me.ruleForm.pastDiseaseHistoryFromJson.push({
        dieaseName: "",
        isTreating: false
      });
    },
    onDelete(item,index){
        let me=this;
        me.$confirm(`确定删除${item.dieaseName}?`).then(response=>{
            me.ruleForm.pastDiseaseHistoryFromJson.splice(index,1);
        });
    },
    loadData() {
      var me = this;
      me.loading=true;
      axios
        .get(apiConfig.medItemDiseaseHistory_get, { params: { id: me.id } })
        .then(response => {
          me.ruleForm = utility.toClientModel(response.data.result);
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
          apiConfig.medItemDiseaseHistory_put,
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