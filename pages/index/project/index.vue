<template>
<div class="padding-xl">
    <div class="padding-m"><h1>项目设置</h1></div>
    <el-row>
        <el-col :span="12" class="padding-m">
        <div class="padding-m"><h2>组织机构</h2></div>
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
            </span>
        </el-tree>
        </el-col>
        <el-col v-if="selectedOrgnization" :span="12" class="padding-m">
            <div><h2>{{selectedOrgnization.displayName}}</h2></div>
            <el-form :inline="true" class="background-color-minor margin-bottom-m padding-m">
                <el-form-item>
                    <el-button @click="onAdd" type="primary" icon="el-icon-plus">添加项目</el-button>
                </el-form-item>
            </el-form>
            <el-table v-loading="list.loading" :data="list.tableData" border highlight-current-row :default-sort="{prop: 'name', order: 'descending'}" class="col-12">
                <el-table-column prop="id"
                                label="项目ID"
                                sortable
                                width="120">
                </el-table-column>
                <el-table-column prop="projectName"
                                label="项目名称"
                                sortable
                                >
                </el-table-column>
                <el-table-column prop="creationTime"
                                label="创建时间"
                                width="200">
                        <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span>{{scope.row.creationTime|time}}</span>
                        </template>
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
      me.$loaderwindow(`/project/projectinorganization?id=${me.selectedOrgnization.id}`, `向【${me.selectedOrgnization.displayName}】添加项目`).then(model => {
        axios.post(apiConfig.project_adds_to_organization,{organizationUnitId:me.selectedOrgnization.id,projectIds:model.map(x=>x.id)}).then(response=>{
          me.$message({ type: "success", message: "添加成员成功！" });
          me.loadData();
        });
      });
    },
    onDelete(model) {
      var me = this;
        me.$confirm(`是否移除【"${model.projectName}】`, "询问", {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            me.deleteSelect(model);
          })
          .catch(() => {});
    },
    deleteSelect(model) {
      var me = this;
      axios.delete(apiConfig.project_delete_from_organization, 
      {params:{ organizationId:me.selectedOrgnization.id,projectId: model.id }})
      .then(response => {
        me.$message({ type: "success", message: `成功移除项目【${model.projectName}】！` });
        me.loadData();
      });
    },
    loadOrgnization() {
      var me = this;
      me.tree.loading=true;
      axios.get(apiConfig.organization_get_by_name,{params:{organizationName:"赛诺多中心"}})
      .then(response => {
        me.tree.treeData = response.data.result.items;
      })
      .finally(()=>{
        me.tree.loading=false;
      });
    },
    loadData() {
      var me = this;
      me.list.loading = true;
      axios.get(apiConfig.project_in_organization, {
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
    }
  },
  mounted() {
    var me = this;
    me.loadOrgnization();
  }
};
</script>