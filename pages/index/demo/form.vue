<template>
<div class="padding-l">
  <el-form v-loading="loading" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="身高">
      <el-input-number v-model="ruleForm.stature"></el-input-number>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio class="radio" v-model="ruleForm.gender" label="female">女</el-radio>
      <el-radio class="radio" v-model="ruleForm.gender" label="male">男</el-radio>
    </el-form-item>
    <el-form-item label="婚否">
      <el-checkbox v-model="ruleForm.isMarried">已婚</el-checkbox>
    </el-form-item>
    <el-form-item label="工作地点">
      <el-radio-group v-model="ruleForm.work">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="爱好">
      <el-checkbox-group v-model="ruleForm.favorite">
        <el-checkbox label="音乐"></el-checkbox>
        <el-checkbox label="足球"></el-checkbox>
        <el-checkbox label="篮球"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="持续时间">
          <el-date-picker v-model="ruleForm.range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="昆明" value="kunming"></el-option>
        <el-option label="呈贡" value="chenggong"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="ruleForm.language" multiple placeholder="掌握的编程语言">
        <el-option value="Basic">Basic</el-option>
        <el-option value="C">C</el-option>
        <el-option value="C++">C++</el-option>
        <el-option value="C#">C#</el-option>
        <el-option value="Java">Java</el-option>
        <el-option value="Javascript">Javascript</el-option>
        <el-option value="Python">Python</el-option>
        <el-option value="Ruby">Ruby</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="详细说明">
      <el-input  v-model="ruleForm.description" type="textarea" :rows="2" :autosize="{ minRows: 2}" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="富文本编辑器">
        <ckeditor v-model="ruleForm.html"></ckeditor>
    </el-form-item>
    <el-form-item label="民族" prop="nationality">
        <biz-select src="/data/nationality.json" v-model="ruleForm.nationality" :modelMap="model=>model.data" valueField="name" displayField="name" :showColumns="['name']"></biz-select>
    </el-form-item>
    <div>
        <el-radio v-model="ruleForm.score" label="0">优秀</el-radio>
    </div>
    <div>
        <el-radio v-model="ruleForm.score" label="1">良好</el-radio>
    </div>
    <div>
        <el-radio v-model="ruleForm.score" label="2">一般</el-radio>
    </div>
    <div>
      <el-button @click="onGet">显示数据</el-button>
      <el-button @click="onSet">设置数据</el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import CKEditor from "~/components/CKEditor4.vue"
export default {
  components:{
    'ckeditor':CKEditor
  },
  props:{
      params:{
        type:Object,
        default:()=>({})
      }
  },
  data:()=>({
      loading:false,
      ruleForm: {
        name: '反转的分针',
        birthday: new Date('1985-04-06'),
        stature: 173,
        gender: 'male',
        isMarried: false,
        favorite: ['音乐'],
        region: 'chenggong',
        language: ['C', 'Java',"C++"],
        description:"",
        score:0,
        range:null,
        work:"",
        html:"",
        nationality:""
      },
      rules:{
        
      }
  }),
  methods: {
    onGet() {
      this.$alert(JSON.stringify(this.ruleForm))
    },
    onSet(){
      this.ruleForm={
        name: '反转的分针',
        birthday: new Date('1985-04-06'),
        stature: 173,
        gender: 'male',
        isMarried: false,
        favorite: ['音乐'],
        region: 'chenggong',
        language: ['C', 'Java',"C++"],
        description:"",
        score:0,
        range:null,
        work:"",
        html:"",
        nationality:""
      };
    }
  },
  mounted(){
    console.log("mounted");
    this.$alert(JSON.stringify(this.$route.query));
  }
}
</script>