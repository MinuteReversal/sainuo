<template>
<div class="padding-l">
        <el-row class="padding-l">
            <el-col :span="12">
                <span class="font-weight-blder"><h1>病例管理</h1></span>
            </el-col>
        </el-row>
        <el-form :inline="true" v-model="search" class="background-color-minor margin-bottom-m padding-m">
            <el-form-item label="" prop="organizationId">
                <el-input placeholder="中心号" v-model="search.organizationId" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="crfNumber">
                <el-input placeholder="CRF号" v-model="search.crfNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="visitNumber">
                <biz-select src="/data/visitnumber.json" v-model="search.visitNumber" placeholder="访视" clearable></biz-select>
            </el-form-item>
            <el-form-item label="" prop="visitTime">
                    <el-date-picker
                        placeholder="访视日期"
                        v-model="search.visitTime"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="访视日期开始"
                        end-placeholder="访视日期结束">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="medProjectId">
                <biz-select @input="onSelectProject" :src="urls.crf_project_get" placeholder="临床检验项目" v-model="search.medProjectId" clearable :modelMap="model=>model.result.items" valueField="id" displayField="projectName" :showColumns="['projectName']"></biz-select>
            </el-form-item>
            <el-form-item label="" prop="medPhaseId">
                <biz-select ref="bsMedPhaseId" :src="urls.crf_phase_get" placeholder="阶段" v-model="search.medPhaseId" clearable :auto-load=false :modelMap="model=>model.result.items" valueField="id" :params="{medProjectId:search.medProjectId}" displayField="phasesName" :showColumns="['phasesName']"></biz-select>
            </el-form-item>
            <el-form-item label="" prop="creatorName">
                <el-input placeholder="填表人" v-model="search.creatorName"></el-input>
            </el-form-item>
            <el-form-item label="" prop="visitTime">
                    <el-date-picker
                        placeholder="填表日期"
                        v-model="search.createTime"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="填表日期开始"
                        end-placeholder="填表日期结束">
                    </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="onAdd">添加病例</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list.tableData"
                  border highlight-current-row
                  v-loading="list.loading"
                  @sort-change="handleSortChange"
                  :default-sort="{prop: 'name', order: 'descending'}"
                  class="col-12">
            <el-table-column prop="organizationUnitId"
                             label="中心号"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="crfNumber"
                             label="CRF号"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="patientName"
                             width="200"
                             label="受试者姓名">
            </el-table-column>
            <el-table-column prop="visitTime"
                             width="120"
                             label="访视日期">
            </el-table-column>
            <el-table-column prop="visitNumber"
                             label="访视"
                             width="80">
            </el-table-column>
            <el-table-column prop="medicalProjectName"
                             label="临床检验项目"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="medicalPhaseName"
                             label="阶段"
                             width="200">
            </el-table-column>
            <el-table-column prop="crfCreatorName"
                             label="CRF填表人"
                             >
            </el-table-column>
            <el-table-column prop="createTime"
                             label="填表最后日期"
                             >
            </el-table-column>
            <el-table-column prop="isCRFValidated"
                             label="完备"
                             >
                    <template slot-scope="scope">
                        {{scope.row.isCRFValidated|boolean}}
                    </template>
            </el-table-column>
            <el-table-column label="操作"
                             fixed="right"
                             width="80">
                <template slot-scope="scope">
                    <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{name:'onEditDetail',model:scope.row}">查看详情</el-dropdown-item>
                        <el-dropdown-item :command="{name:'onEdit',model:scope.row}">编辑病例</el-dropdown-item>
                        <el-dropdown-item :command="{name:'onEditDetail',model:scope.row}">编辑详情</el-dropdown-item>
                        <el-dropdown-item :command="{name:'onExportWord',model:scope.row}">导出word</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="clear"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="list.currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="list.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="list.total">
        </el-pagination>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import BizSelect from "~/components/BizSelect.vue"
import download from "~/static/javascript/download"

export default{
    components:{
        'biz-select':BizSelect
    },
    data:() =>({
        urls:{
            crf_phase_get:apiConfig.crf_phase_get,
            crf_project_get:apiConfig.crf_project_get
        },
        search: {
            crfNumber:"",
            patientName:"",
            visitTime:[],
            visitNumber:null,
            createTime:[],
            creatorName:"",
            medProjectId:null,
            medPhaseId:null,
            isValidated:null
        },
        list: {
            tableData: [],
            multipleSelection: [],
            loading: false,
            currentPage: 1,
            pageSize: 20,
            total: 0,
            sort: {}
        },
        currentUserId:0
    }),
    methods: {
        handleSortChange(sort) {
            var me = this;
            me.list.sort = {};
            if (sort.column !== null) {
                me.list.sort[sort.prop] = sort.order === "ascending" ? "asc" : "desc";
            }
            me.loadData();
        },
        getSort() {
            var me = this;
            var sort = me.list.sort;
            var sorts = [];
            for (var p in sort) {
                sorts.push(p + " " + sort[p]);
            }
            var r = sorts.join(",");
            return r === "" ? undefined : r;
        },
        getSkip () {
            var me = this;
            return (me.list.currentPage - 1) * me.list.pageSize;
        },
        handleSizeChange(val) {
            this.list.pageSize = val;
            this.loadData();
        },
        handleCurrentChange (val) {
            this.list.currentPage = val;
            this.loadData();
        },
        handleCommand(command) {
            this[command.name](command.model);
        },
        onSelectProject(val){
            var me=this;
            if(val){
                me.$nextTick(()=>me.$refs.bsMedPhaseId.loadData())
            }
            else
            {
                me.search.medPhaseId=null;
                me.$refs.bsMedPhaseId.options=[];
            }
        },
        onAdd() {
            var me = this;
            me.$loaderwindow("/tester/editcrf?id=0", "添加病例")
            .then( m => {
                me.$message({ type: "success", message: "添加病例成功！" });
                me.loadData();
                me.$confirm(`转到病例详情?`, '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
                .then(() => {
                     me.$router.push(`/main/tester/forms?id=${m.result}`);
                });
            });
        },
        onEdit(model) {
            var me = this;
            me.$loaderwindow(`/tester/editcrf?id=${model.id}`, `编辑病例`)
            .then( m => {
                me.$message({ type: "success", message: "编辑病例成功！" });
                me.loadData();
            });
        },
        onEditDetail(model) {
            var me = this;
            me.$store.dispatch("modules/crf/updateCrfInfo",model);
            me.$router.push(`/main/tester/forms?id=${model.id}`);
        },
        onExportWord(model) {
            var me = this;
            axios.post(`${apiConfig.crf_export_word}?crfBaseId=${model.id}`).then(response=>{
                download(response.data.result
                ,null
                ,"GET"
                ,`CRF${new Date().format("yyyy-MM-ddTHH:mm:ss")}`
                ,()=>{}
                ,()=>{}
                ,(xhr)=>{
                    me.$alert({
                        showClose: true,
                        message: JSON.parse(xhr.responseText).error.message,
                        duration: 5000,
                        type: 'error'
                    });
                }
                );   
            });
        },
        loadData () {
            var me = this;
            let s = me.search;
            let d = {
                crfNumber:s.crfNumber,
                patientName:s.patientName,
                visitTimeStart:s.visitTime ?s.visitTime[0] :null,
                visitTimeEnd:s.visitTime ?s.visitTime[1] :null,
                visitNumber:s.visitNumber,
                createTimeStart:s.createTime ?s.createTime[0] :null,
                createTimeEnd:s.createTime ?s.createTime[1] :null,
                creatorName:s.creatorName,
                medProjectId:s.medProjectId,
                medPhaseId:s.medPhaseId,
                isValidated:s.isValidated,
                skipCount: me.getSkip(),
                maxResultCount: me.list.pageSize
            };
            me.list.loading = true;
            axios.get(apiConfig.crf_get,{params:d})
            .then(response => {
                me.list.tableData = response.data.result.items;
                me.list.total = response.data.result.totalCount;
            })
            .finally(response=>{
                me.list.loading=false;
            });
        }
    },
    mounted () {
        var me = this;
        me.loadData();
    }
};
</script>