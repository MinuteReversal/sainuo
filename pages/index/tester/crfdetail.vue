<template>
<div class="padding-l overflow-hidden">
        <el-row class="padding-l">
            <el-col :span="12">
                <span class="font-weight-blder"><h1>受试者CRF列表</h1></span>
            </el-col>
        </el-row>
        <el-form label-width="120px">
            <el-form-item label="中心号">
                {{crf.organizationId}}
            </el-form-item>
            <el-form-item label="受试者姓名">
                {{crf.patientName}}
            </el-form-item>
            <el-form-item label="受试项目">
                {{crf.medProjectName}}
            </el-form-item>
            <el-form-item label="性别">
                {{crf.gender|gender}}
            </el-form-item>
            <el-form-item label="出生日期">
                {{crf.birthday|date}}
            </el-form-item>
            <el-form-item label="手机号码">
                {{crf.phoneNumber}}
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
            </el-table-column>
            <el-table-column label="操作"
                             fixed="right"
                             width="80">
                <template slot-scope="scope">
                    <el-button type="primary" @click="onEditDetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from "axios"
import apiConfig from "~/static/apiConfig"
import BizSelect from "~/components/BizSelect.vue"

export default{
    computed: {
        crf(){
            return this.$store.state.modules.crf.crf;
        }
    },
    components:{
        'biz-select':BizSelect
    },
    data(){
        return {
            list: {
                tableData: [],
                multipleSelection: [],
                loading: false,
                currentPage: 1,
                pageSize: 20,
                total: 0,
                sort: {}
            }
        };
    },
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
            }else{
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
            //me.$store.dispacth("modules/crf/updateCrfInfo",model);
            me.$emit("confirm",{target:me});
            me.$router.push(`/main/tester/forms?id=${model.id}`);
        },
        onExportWord(model) {
            var me = this;
            me.$loaderwindow(`/tester/notqualified?id=${model.id}`, `剔除`)
                .then(m => {
                    me.$message({ type: "success", message: "剔除成功！" });
                    me.loadData();
                });
        },
        loadData () {
            var me = this;
            let s = me.search;
            let d = {
                crfNumber:me.crf.crfNumber,
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
}
</script>