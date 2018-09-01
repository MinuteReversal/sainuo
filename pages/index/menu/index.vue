<template>
<div class="padding-xl">
    <div class="padding-m"><h1>菜单管理</h1></div>
    <el-row>
        <el-col :span="12" class="padding-m">
        <el-input
            class="margin-top-xl"
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
            @node-click="onSelected"
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
        <el-col :span="12" class="padding-m">
        <div style="margin-top:200px;">&lt;=请点击左边的菜单进行操作。</div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import axios from "axios";
import apiConfig from "~/static/apiConfig";
import BizSelectTree from "~/components/BizSelectTree.vue"

export default {
    components:{
        'biz-select-tree':BizSelectTree
    },
    watch: {
        "tree.filterText"(val) {
            this.$refs.tree.filter(val);
        }
    },
    data: () => ({
        selected:null,
        tree: {
        filterText: "",
        loading:false,
        treeData: [],
        props: {
            label: "name",
            children: "items"
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
        onSelected(node){
        var me = this;
        me.selected = node;
        },
        loadTree() {
        var me = this;
        me.tree.loading=true;
        axios.get(apiConfig.menu_get,{params:{
                        parentId:0,
                        name: ""
        }}).then(response => {
            me.tree.treeData = response.data.result;
        })
        .finally(()=>{
            me.tree.loading=false;
        });
        },
        filterNode(value, data) {
        if (!value) return true;
            return data.displayName.indexOf(value) !== -1;
        },
        eidt(node, data){
            var me=this;
            me.$loaderwindow(`/menu/edit?id=${data.id}`,`编辑${data.name}`).then(model=>{
                for(var p in model){
                data[p]=model[p];
                }
                me.$message({ type: "success", message: "菜单编辑成功" });
            });
        },
        append(node, data) {
        var me=this;
        me.$loaderwindow(`/menu/edit?id=0&parentId=${node.data.id}`,`创建菜单`).then(model=>{
            const newChild = model;
            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
            me.$message({ type: "success", message: "添加成功" });
        });
        },    
        remove(node, data) {
        var me=this;
        me.$confirm(`是否永久删除[${data.displayName}]?`, '询问', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            axios.delete(apiConfig.menu_delete,{params:{id:data.id}}).then(response=>{
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
            me.$message({ type: "success", message: "菜单删除成功" });
            me.selected=null;
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
        me.loadTree();
    }
};
</script>