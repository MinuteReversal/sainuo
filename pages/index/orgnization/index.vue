<template>
<div class="padding-xl">
    <div class="padding-m"><h1>组织机构</h1></div>
    <el-row>
        <el-col :span="12">
        <el-input
            placeholder="输入关键字进行过滤"
            suffix-icon="el-icon-search"
            v-model="tree.filterText">
        </el-input>
        <el-tree
            ref="tree"
            v-loading="tree.loading"
            :data="tree.treeData"
            :props="tree.props"
            node-key="id"
            default-expand-all
            @node-click="onSelectedOrganization"
            :filter-node-method="filterNode"
            :expand-on-click-node="false">
            <span slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <i class="el-icon-edit margin-m" @click="eidt(node,data)"></i>
            <i class="el-icon-circle-plus-outline margin-m" @click="append(node, data)"></i>
            <i class="el-icon-remove-outline margin-m" @click="remove(node, data)"></i>
            </span>
        </el-tree>
        </el-col>
        <el-col v-if="selectedOrgnization" :span="12" class="padding-m">
            <div><h1>{{selectedOrgnization.displayName}}</h1></div>
            <el-form :inline="true" class="background-color-minor margin-bottom-m padding-m">
                <el-form-item>
                    <el-button @click="onAdd" type="primary" icon="el-icon-plus">添加成员</el-button>
                </el-form-item>
            </el-form>
            <el-table v-loading="list.loading" :data="list.tableData" border highlight-current-row :default-sort="{prop: 'name', order: 'descending'}" class="col-12">
                <el-table-column prop="userName"
                                label="用户名"
                                sortable
                                width="180">
                </el-table-column>
                <el-table-column prop="name"
                                label="姓名"
                                sortable
                                width="160">
                </el-table-column>
                <el-table-column prop="phoneNumber"
                                label="手机号"
                                sortable
                                width="180">
                </el-table-column>
                <el-table-column prop="addedTime"
                                label="添加时间"
                                width="180">
                </el-table-column>
                <el-table-column label="操作"
                                fixed="right"
                                width="100">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" icon="el-icon-delete"  @click="onDelete(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="clear"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="list.currentPage"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
            </el-pagination>
        </el-col>
        <el-col v-else :span="12" class="padding-m">
        <div style="margin-top:200px;">&lt;=请点击左边的组织机构进行操作。</div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import axios from "axios";
import apiConfig from "~/static/apiConfig";
export default {
    watch: {
        "tree.filterText"(val) {
            this.$refs.tree.filter(val);
        }
    },
    data: () => ({
        selectedOrgnization:null,
        tree: {
        filterText: "",
        loading:false,
        treeData: [],
        props: {
            label: "displayName",
            children: "children"
        }
        },
        list: {
        tableData: [],
        multipleSelection: [],
        loading: false,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        sort: {}
        }
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
        getSkip() {
        var me = this;
        return (me.list.currentPage - 1) * me.list.pageSize;
        },
        handleSizeChange(val) {
        this.list.pageSize = val;
        this.loadData();
        },
        handleCurrentChange(val) {
        this.list.currentPage = val;
        this.loadData();
        },
        onSelectedOrganization(node){
        var me=this;
        me.selectedOrgnization=node;
        me.loadData();
        },
        onAdd() {
        var me = this;
        me.$loaderwindow(`/orgnization/userinorgnization?id=${me.selectedOrgnization.id}`, "添加成员").then(model => {
            axios.post(apiConfig.organization_add_users,{organizationUnitId:me.selectedOrgnization.id,userIds:model.map(x=>x.id)}).then(response=>{
            me.$message({ type: "success", message: "添加成员成功！" });
            me.loadData();
            });
        });
        },
        onEdit(model) {
        var me = this;
        me.$loaderwindow(`/role/edit?id=${model.id}`, "编辑角色")
            .then(model => {
            me.$message({ type: "success", message: "编辑角色成功！" });
            me.loadData();
            });
        },
        onDelete(model) {
        var me = this;
        if (model) {
            me.$confirm("是否移除[" + model.name + "]?", "询问", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                me.deleteSelect(model);
            })
            .catch(() => {});
        } else {
            me.$alert("请勾中要删除的项");
        }
        },
        deleteSelect(model) {
        var me = this;
        axios.delete(apiConfig.organization_delete_user_by_organizationiduserid, 
        {params:{ organizationId:me.selectedOrgnization.id,userId: model.id }})
        .then(response => {
            me.$message({ type: "success", message: "成功移除用户！" });
            me.loadData();
        });
        },
        loadOrgnization() {
        var me = this;
        me.tree.loading=true;
        axios.get(apiConfig.organization_get_by_name,{params:{organizationName:"赛诺多中心"}}).then(response => {
            me.tree.treeData = response.data.result.items;
        })
        .finally(()=>{
            me.tree.loading=false;
        });
        },
        loadData() {
        var me = this;
        me.list.loading = true;
        axios.get(apiConfig.organization_user_get, {
            params:{
                organizationId:me.selectedOrgnization.id,
                skipCount: me.getSkip(),
                maxCount: me.list.pageSize
            }
            })
            .then(response => {
            me.list.tableData = response.data.result.items;
            me.list.total = response.data.result.totalCount;
            })
            .finally(() => {
            me.list.loading = false;
            });
        },
        filterNode(value, data) {
        if (!value) return true;
            return data.displayName.indexOf(value) !== -1;
        },
        eidt(node, data){
            var me=this;
            me.$loaderwindow(`/orgnization/edit?id=${data.id}`,`编辑${data.displayName}`).then(model=>{
                for(var p in model){
                data[p]=model[p];
                }
                me.$message({ type: "success", message: "组织机构编辑成功" });
            });
        },
        append(node, data) {
        var me=this;
        me.$loaderwindow(`/orgnization/edit?id=0&parentId=${node.data.id}`,`创建组织`).then(model=>{
            const newChild = model;
            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
            me.$message({ type: "success", message: "组织机构添加成功" });
        });
        },
        remove(node, data) {
        var me=this;
        me.$confirm(`是否永久删除[${data.displayName}]?`, '询问', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            axios.delete(apiConfig.organization_delete,{params:{organizationId:data.id}}).then(response=>{
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            me.$message({ type: "success", message: "组织机构删除成功" });
            me.selectedOrgnization=null;
            });
        }).catch(() => {

        });
        },
        handleDragStart(node, ev) {
        console.log("drag start", node);
        },
        handleDragEnter(draggingNode, dropNode, ev) {
        console.log("tree drag enter: ", dropNode.label);
        },
        handleDragLeave(draggingNode, dropNode, ev) {
        console.log("tree drag leave: ", dropNode.label);
        },
        handleDragOver(draggingNode, dropNode, ev) {
        console.log("tree drag over: ", dropNode.label);
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log("tree drag end: ", dropNode && dropNode.label, dropType);
        },
        handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log("tree drop: ", dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === "二级 3-1") {
            return type !== "inner";
        } else {
            return true;
        }
        },
        allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf("三级 3-1-1") === -1;
        }
    },
    mounted() {
        var me = this;
        me.loadOrgnization();    
    }
};
</script>