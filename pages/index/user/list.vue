<template>
<div class="padding-xl">
        <div class="padding-m"><h1>用户管理</h1></div>
        <el-row>
            <el-col :span="12">
                
            </el-col>
        </el-row>
        <el-form :inline="true" v-model="search" class="background-color-minor margin-bottom-m padding-m">
            <el-form-item prop="name">
                <el-input placeholder="输入关键字搜索" v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="onAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list.tableData"
                  border highlight-current-row
                  v-loading="list.loading"
                  @sort-change="handleSortChange"
                  :default-sort="{prop: 'name', order: 'descending'}"
                  class="col-12">
            <el-table-column prop="userName"
                             label="用户名"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="fullName"
                             label="全名"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="roleName"
                             label="角色"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="emailAddress"
                             width="200"
                             label="邮箱">
            </el-table-column>
            <el-table-column prop="address"
                             width="120"
                             label="手机号码">
            </el-table-column>
            <el-table-column prop="lastLoginTime"
                             label="上次登录时间"
                             width="200">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span>{{scope.row.lastLoginTime|time}}</span>
                    </template>
            </el-table-column>
            <el-table-column prop="creationTime"
                             label="创建时间"
                             width="200">
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span>{{ scope.row.creationTime|time}}</span>
                    </template>
            </el-table-column>
            <el-table-column label="操作"
                             fixed="right"
                             width="400">
                <template slot-scope="scope">
                    <el-switch class="margin-xl" @change="onToggle(scope.row)"
                               v-model="scope.row.isActive"
                               active-text=""
                               inactive-text=""
                               active-color="#13ce66"
                               inactive-color="#ff4949"
                    >
                    </el-switch>
                    <el-button size="small" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button size="small" icon="el-icon-edit" @click="onResetPassword(scope.row)">重置密码</el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete"  @click="onDelete(scope.row)">删除</el-button>
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
    data:() =>({
        search: {
            name: ""
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
            me.list.loading = true;
            axios.post(apiConfig.user_all_get, {
                skipCount: me.getSkip(),
                maxResultCount: me.list.pageSize
            })
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