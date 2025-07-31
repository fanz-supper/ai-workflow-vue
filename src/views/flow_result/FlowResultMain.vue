<template>

  <el-col :offset="20">
    <el-button type="primary" @click="onRefresh" plain>刷新</el-button>
  </el-col>

  <el-col :span="22">

    <el-table :data="tableData" style="width: 100%" :show-overflow-tooltip="true">
      <el-table-column type="index" label="No." width="50" />
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="workflowId" label="NodeId"/>
      <el-table-column prop="groupId" label="ResultId"/>
      <el-table-column prop="status" label="Status"/>
      <el-table-column prop="createTime" label="Create Time"/>
      <el-table-column prop="updateTime" label="Update Time"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="onDetailClick(scope.$index, scope.row)">
            详情结果
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>

  <Page ref="page" @changePage="onChangePage" :total-count="totalCount"/>

</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue'
import flowResultApi from '@/api/flow_result'
import {onMounted, ref} from "vue";
import type {FlowResultType} from '@/views/flow_result/base'

const tableData = ref([]);
const totalCount = ref(0);
const page = ref();

const onChangePage = (currentPage: number, pageSize: number) => {
  flowResultApi.queryList({
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
const rowDetail = ref(<FlowResultType>{});

const onRefresh = () => {
  onChangePage(1, page.value.defPageSize);
}
const onAddClick = () => {
  detailVisible.value = true;
  rowDetail.value = <FlowResultType>{};
}

const onDetailClick = (index: number, row: FlowResultType) => {
  detailVisible.value = true;
  rowDetail.value = row;
}

</script>

<style scoped>

</style>