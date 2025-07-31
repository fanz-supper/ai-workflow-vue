<template>

  <el-col :offset="20">
    <el-button type="primary" @click="onAddClick" plain>添加</el-button>
    <el-button type="primary" @click="onRefresh" plain>刷新</el-button>
  </el-col>

  <el-col :span="22">

    <el-table :data="tableData" style="width: 100%" :show-overflow-tooltip="true">
      <el-table-column type="index" label="No." width="50" />
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="groupId" label="GroupId"/>
      <el-table-column prop="dataId" label="DataId"/>
      <el-table-column prop="componentId" label="ComponentId"/>
      <el-table-column prop="type" label="Type"/>
      <el-table-column prop="status" label="Status"/>
      <el-table-column prop="data" label="Data"/>
      <el-table-column prop="result" label="Result"/>
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
  <MockResultDetail v-model="detailVisible" :data="rowDetail"/>

</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue'
import {onMounted, ref} from "vue";
import MockResultDetail from "@/views/mock/MockResultDetail.vue";
import mockResultApi from "@/api/mock_result";
import type {MockResultType} from "@/views/mock/base";

const tableData = ref([]);
const totalCount = ref(0);
const page = ref();

const onChangePage = (currentPage: number, pageSize: number) => {
  mockResultApi.queryList({
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

const detailVisible = ref(false)
const rowDetail = ref(<MockResultType>{});

const onRefresh = () => {
  onChangePage(1, page.value.defPageSize);
}
const onAddClick = () => {
  detailVisible.value = true;
  rowDetail.value = <MockResultType>{};
}

const onDetailClick = (index: number, row: MockResultType) => {
  detailVisible.value = true;
  rowDetail.value = row;
}

</script>

<style scoped>

</style>