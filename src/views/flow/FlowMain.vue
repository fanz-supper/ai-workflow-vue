<template>


  <el-col :offset="20">
    <el-button type="primary" @click="onAddClick" plain>添加</el-button>
    <el-button type="primary" @click="onRefresh" plain>刷新</el-button>
  </el-col>

  <el-col :span="22">
    <el-table :data="tableData" style="width: 100%" :show-overflow-tooltip="true">
      <el-table-column type="index" label="No." width="50" />
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="createTime" label="Create Time"/>
      <el-table-column prop="updateTime" label="Update Time"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="onDetailClick(scope.$index, scope.row)">
            Detail
          </el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>

  <Page ref="page" @changePage="onChangePage" :total-count="totalCount"/>

</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue'
import {onMounted, ref} from "vue";
import flowApi from '@/api/flow.ts'
import type {FlowType} from "@/views/flow/base";
import router from '@/router/index';

const tableData = ref([]);
const totalCount = ref(0);
const page = ref();

const onChangePage = (currentPage: number, pageSize: number) => {

  flowApi.queryList({
    currentPage: currentPage,
    pageSize: pageSize,
  }).then(res => {
    tableData.value = res.data.result.list
    totalCount.value = res.data.result.total;
  })
}

const initData = async () => {
  onChangePage(1, page.value.defPageSize);
};
onMounted(initData)

const onRefresh = () => {
  onChangePage(1, page.value.defPageSize);
}
const onAddClick = () => {
  router.push("/flow")
}

const onDetailClick = (index: number, row: FlowType) => {
  router.push("/flow/" + row.id)
}

</script>

<style scoped>

</style>