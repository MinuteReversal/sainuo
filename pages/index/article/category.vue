<template>
<div class="padding-l">
        <el-row class="padding-l">
            <el-col :span="12">
                <span class="font-weight-blder"><h1>栏目管理</h1></span>
            </el-col>
        </el-row>
        <el-form :inline="true" v-model="search" class="background-color-minor margin-bottom-m padding-m">
            <el-form-item prop="name">
                <el-input placeholder="输入关键字搜索" v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="onAdd">新增</el-button>
                <el-button type="danger" icon="el-icon-delete"  @click="onBatchDelete()">批量删除</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list.tableData"
                  border highlight-current-row
                  v-loading="list.loading"
                  @sort-change="handleSortChange"
                  @selection-change="handleSelectionChange"
                  ref="multipleTable"
                  :default-sort="{prop: 'name', order: 'descending'}"
                  class="col-12">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column prop="id"
                             label="栏目ID"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="name"
                             label="栏目名称"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="order"
                             label="排序值"
                             sortable
                             width="120">
            </el-table-column>
            <el-table-column prop="isShow"
                             width="200"
                             label="启用">
                    <template slot-scope="scope">
                        <span>{{scope.row.isShow|boolean}}</span>
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
                    <el-button size="small" icon="el-icon-edit" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button size="small" icon="el-icon-view" @click="onToggle(scope.row)">{{scope.row?"禁用":"启用"}}</el-button>
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
    data(){ 
        return {
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
        handleSelectionChange(val) {
            this.list.multipleSelection = val;
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
             axios.put(apiConfig.category_show,{
                "id": model.id,
                "isShow": !model.isShow
            })
            .then(response =>{
                model.isShow=!model.isShow;
            });
        },
        onAdd() {
            var me = this;
            me.$loaderwindow("/article/categoryedit?id=0", "创建栏目")
                .then( model => {
                    me.$message({ type: "success", message: "创建栏目成功！" });
                    me.loadData();
                });
        },
        onEdit(model) {
            var me = this;
            me.$loaderwindow(`/article/categoryedit?id=${model.id}`, "编辑栏目")
                .then(model => {
                    me.$message({ type: "success", message: "编辑栏目成功！" });
                    me.loadData();
                });
        },
        onBatchDelete(){
            let me=this;
            if(me.list.multipleSelection.length){
                me.$confirm(`是否永久删除[${me.list.multipleSelection.map(x=>x.name).join("],[")}]?`, '询问', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    me.deleteSelect(me.list.multipleSelection.map(x=>x.id));
                });
            }
            else{
                me.$message({type:"warning",message:"请勾中要删除的栏目"});
            }
        },
        onDelete(model) {
            var me = this;
            me.$confirm(`是否永久删除[${model.name}]?`, '询问', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                me.deleteSelect(model.id);
            });
        },
        deleteSelect(id){
            var me=this;
            axios.delete(apiConfig.category_delete,{params:{id:id}}).then(response=>{
                me.$message({ type: "success", message: "删除栏目成功！" });
                me.loadData();
            });
        },
        checkMultipleSelection(){
            let me=this;
            me.list.multipleSelection.forEach(row => {
                me.$refs.multipleTable.toggleRowSelection(row);
            });
        },
        loadData () {
            var me=this;
            me.list.loading = true;
            axios.get(apiConfig.category_get, {params:{
                skipCount: me.getSkip(),
                maxResultCount: me.list.pageSize
            }})
            .then(response => {
                me.list.tableData = response.data.result.items;
                me.list.total = response.data.result.totalCount;
               //me.checkMultipleSelection();
            })
            .finally(response=>{
                me.list.loading=false;
            });
        }
    },
    mounted () {
        var me = this;
        me.loadData();
        window.vm=this;
    }
};
</script>    