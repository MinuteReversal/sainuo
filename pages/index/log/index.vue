<template>
<div class="padding-xl">
        <div class="padding-m"><h1>审计日志</h1></div>
        <el-row class="padding-l">
            <el-col :span="12">
               
            </el-col>
        </el-row>
        <el-form :inline="true" v-model="search" class="background-color-minor margin-bottom-m padding-m">
            <el-form-item label="" prop="serviceName">
                    <el-date-picker
                        v-model="search.date"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="" prop="serviceName">
                <el-select v-model="search.hasException" placeholder="错误状态">
                    <el-option label="全部" :value=null>全部</el-option>
                    <el-option label="成功" :value=false>成功</el-option>
                    <el-option label="失败" :value=true>失败</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" prop="serviceName">
                <el-input placeholder="服务名称" v-model="search.serviceName"></el-input>
            </el-form-item>
            <el-form-item label=""  prop="serviceName">
                <el-input placeholder="方法名称" v-model="search.methodName"></el-input>
            </el-form-item>
            <el-form-item label=""  prop="userName">
                  <el-input placeholder="用户名" v-model="search.userName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>                
            </el-form-item>
        </el-form>
        <el-table :data="list.tableData"
                  border highlight-current-row
                  v-loading="list.loading"
                  @sort-change="handleSortChange"
                  :default-sort="{prop: 'name', order: 'descending'}"
                  class="col-12">
            <el-table-column prop="exception"
                             label="状态"
                             sortable
                             width="80">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.exception === null ? 'success' : 'danger'"
                disable-transitions>{{scope.row.exception === null ? '成功' : '失败'}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column prop="executionTime"
                             label="创建时间"
                             width="200">
            </el-table-column>
            <el-table-column prop="userName"
                             label="用户名"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="serviceName"
                             width="500"
                             label="服务名称">
            </el-table-column>
            <el-table-column prop="methodName"
                             width="200"
                             label="方法名称">
            </el-table-column>
            <el-table-column prop="executionDuration"
                             label="耗时"
                             width="200">
            </el-table-column>
            <el-table-column prop="clientIpAddress"
                             label="IP"
                             width="200">
            </el-table-column>
            <el-table-column prop="clientName"
                             label="客户端名称"
                             width="200">
            </el-table-column>
            <el-table-column prop="browserInfo"
                             label="浏览器"
                             width="200">
            </el-table-column>
            <el-table-column prop="customData"
                             label="自定义数据"
                             width="200">
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
    data:() =>({
        search: {
            userName: "",
            serviceName:"",
            actionName:"",
            hasException:null,
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
        onToggle(model) {
            var me = this;
             axios.put(apiConfig.user_active,{
                "userId": model.id,
                "isActived": model.isActive
            }).then(response =>{});
        },
        onAdd() {
            var me = this;
            me.$loaderwindow("/user/edit?id=0", "创建用户")
                .then( model => {
                    me.$message({ type: "success", message: "创建用户成功！" });
                    me.loadData();
                });
        },
        onEdit(model) {
            var me = this;
            me.$loaderwindow(`/user/edit?id=${model.id}`, "编辑用户")
                .then(model => {
                    me.$message({ type: "success", message: "编辑用户成功！" });
                    me.loadData();
                });
        },
        onDelete(model) {
            var me = this;
            if (model) {
                me.$confirm('是否永久删除[' + model.userName + ']?', '询问', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    me.deleteSelect(model);
                }).catch(() => {

                });
            } else {
                me.$alert("请勾中要删除的项");
            }
        },
        deleteSelect(model){
            var me=this;
            axios.post(apiConfig.user_delete,{id:model.id}).then(response=>{
                me.$message({ type: "success", message: "删除用户成功！" });
                me.loadData();
            });
        },
        onResetPassword (model) {
            var me = this;
            me.$loaderwindow(`/user/resetpassword?id=${model.id}`, `重置[${model.userName}]密码`)
                .then((model) => {
                    me.$message({ type: "success", message: "重置密码成功！" });
                });
        },
        loadData () {
            var me=this;
            let s=me.search;
            me.list.loading = true;
            axios.get(apiConfig.log_audited_get,{params:
                    {
                        userName:s.userName,
                        serviceName:s.serviceName,
                        actionName:s.actionName,
                        hasException:s.hasException,
                        startTime:s.date ? s.date[0]:null,
                        endTime:s.date ? s.date[1]:null,
                        skipCount: me.getSkip(),
                        maxResultCount: me.list.pageSize
                    }
                }
            )
            .then(response => {
                me.list.tableData = response.data.result.items;
                me.list.total = response.data.result.totalCount;
            }).finally(response=>{
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
    