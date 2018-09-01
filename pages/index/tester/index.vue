<template>
<div class="padding-l">
        <el-row class="padding-l">
            <el-col :span="12">
                <span class="font-weight-blder"><h1>受试者管理</h1></span>
            </el-col>
        </el-row>
        <el-form :inline="true" v-model="search" class="background-color-minor margin-bottom-m padding-m">
            <el-form-item label="" prop="organizationId">
                <el-input placeholder="中心号" v-model="search.organizationId"></el-input>
            </el-form-item>
            <el-form-item label="" prop="crfNumber">
                <el-input placeholder="CRF号" v-model="search.crfNumber"></el-input>
            </el-form-item>
            <el-form-item label="" prop="date">
                    <el-date-picker
                        placeholder="生日区间"
                        v-model="search.date"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="出生开始时间"
                        end-placeholder="出生结束时间">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="gender">
                <el-select v-model="search.gender" placeholder="性别" clearable>
                    <el-option label="女" :value=0>女</el-option>
                    <el-option label="男" :value=1>男</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" prop="notQualified">
                <el-select v-model="search.notQualified" placeholder="剔出" clearable>
                    <el-option label="否" :value=false>否</el-option>
                    <el-option label="是" :value=true>是</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" prop="quit">
                <el-select v-model="search.quit" placeholder="脱落" clearable>
                    <el-option label="否" :value=false>否</el-option>
                    <el-option label="是" :value=true>是</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=""  prop="patientName">
                  <el-input placeholder="受试者" v-model="search.patientName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="onAdd">添加受试者</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list.tableData"
                  border highlight-current-row
                  v-loading="list.loading"
                  @sort-change="handleSortChange"
                  :default-sort="{prop: 'name', order: 'descending'}"
                  class="col-12">
            <el-table-column prop="organizationId"
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
            <el-table-column prop="birthday"
                             width="120"
                             label="出生日期">
            </el-table-column>
            <el-table-column prop="gender"
                             label="性别"
                             width="80">
                        <template slot-scope="scope">
                            {{scope.row.gender|gender}}
                        </template>
            </el-table-column>
            <el-table-column prop="nationality"
                             label="民族"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="medProjectName"
                             label="受试项目"
                             width="200">
            </el-table-column>
            <el-table-column prop="phoneNumber"
                             label="手机号码"
                             >
            </el-table-column>
            <el-table-column prop="notQualified"
                             label="剔除"
                             width="80">
                             <template slot-scope="scope">{{scope.row.notQualified?"是":"否"}}</template>
            </el-table-column>
            <el-table-column prop="quit"
                             label="脱落"
                             width="80">
                             <template slot-scope="scope">{{scope.row.quit?"是":"否"}}</template>
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
                        <el-dropdown-item :command="{name:'onEdit',model:scope.row}">编辑</el-dropdown-item>
                        <el-dropdown-item :command="{name:'onView',model:scope.row}">查看CRF</el-dropdown-item>
                        <el-dropdown-item :command="{name:'onNotQualified',model:scope.row}">剔除</el-dropdown-item>
                        <el-dropdown-item :command="{name:'onQuit',model:scope.row}">脱落</el-dropdown-item>
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
export default{
    data(){
        return{
            search: {
                organizationId:null,
                quit:null,
                notQualified:null,
                gender:null,
                phoneNumber: "",
                userName:"",
                crfNumber:"",
                date:[]
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
        onAdd() {
            var me = this;
            me.$loaderwindow("/tester/edit?id=0", "添加受试者")
                .then( m => {
                    me.$message({ type: "success", message: "添加受试者成功！" });
                    me.loadData();
                });
        },
        onEdit(model) {
            var me = this;
            me.$loaderwindow(`/tester/edit?id=${model.id}`, `编辑受试者`)
                .then( m => {
                    me.$message({ type: "success", message: "编辑受成功！" });
                    me.loadData();
                });
        },
        onView(model) {
            var me = this;
            me.$store.dispatch("modules/crf/updateCrfInfo",model);
            me.$loaderwindow(`/tester/crfdetail?id=${model.id}`, `查看${model.patientName}详情`);
            //me.$router.push(`/main/tester/crfdetail?id=${model.id}`);
        },
        onNotQualified(model) {
            var me = this;
            me.$loaderwindow(`/tester/notqualified?id=${model.id}`, `剔除`)
                .then(m => {
                    me.$message({ type: "success", message: "剔除成功！" });
                    me.loadData();
                });
        },
        onQuit(model) {
            var me = this;
            me.$loaderwindow(`/tester/quit?id=${model.id}`, `脱落`)
                .then(m => {
                    me.$message({ type: "success", message: "脱落成功！" });
                    me.loadData();
                });
        },
        onSMS(model) {
            var me = this;
            me.$loaderwindow(`/user/edit?id=${model.id}`, `编辑用户`)
                .then(m => {
                    me.$message({ type: "success", message: "编辑用户成功！" });
                    me.loadData();
                });
        },
        loadData () {
            var me = this;
            let s = me.search;
            let d = {
                    gender:s.gender,
                    phoneNumber:s.phoneNumber,
                    patientName:s.patientName,
                    quit:s.quit,
                    notQualified:s.notQualified,
                    birthdayStart: s.date?s.date[0] :null,
                    birthdayEnd: s.date ?s.date[1] :null,
                    crfNumber:s.crfNumber,
                    skipCount: me.getSkip(),
                    maxResultCount: me.list.pageSize
            };
            me.list.loading = true;
            axios.get(apiConfig.tester_get,{params:d})
            .then(response => {
                me.list.tableData = response.data.result.items;
                me.list.total = response.data.result.totalCount;
            }).finally(()=>{
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