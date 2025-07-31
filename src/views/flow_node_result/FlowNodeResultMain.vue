<template>

  <el-col :offset="20">
    <el-button type="primary" @click="onRefresh" plain>刷新</el-button>
  </el-col>

  <el-col :span="22">

    <el-table :data="tableData" style="width: 100%" :show-overflow-tooltip="true">
      <el-table-column type="index" label="No." width="50"/>
      <el-table-column prop="id" label="Id" width="180"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="nodeId" label="NodeId"/>
      <el-table-column prop="resultId" label="ResultId"/>
      <el-table-column prop="serviceType" label="ServiceType"/>
      <el-table-column prop="status" label="Status"/>
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

  <ModelDescriptions v-model="descriptionsVisible.model" :result-id="rowDetail.id"/>
  <ForEndDescriptions v-model="descriptionsVisible.forEnd" :result-id="rowDetail.id"/>

</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue'
import flowNodeResultApi from '@/api/flow_node_result'
import {onMounted, ref} from "vue";
import type {FlowNodeResultType} from "@/views/flow_node_result/base";
import ModelDescriptions from "@/views/flow_node_result/descriptions/ModelDescriptions.vue";
import ForEndDescriptions from "@/views/flow_node_result/descriptions/ForEndDescriptions.vue";

const tableData = ref([]);
const totalCount = ref(0);
const page = ref();
const descriptionsVisible = ref({
  forEnd: false,
  model: false,
});

const onChangePage = (currentPage: number, pageSize: number) => {
  flowNodeResultApi.queryList({
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

const rowDetail = ref(<FlowNodeResultType>{});

const onRefresh = () => {
  onChangePage(1, page.value.defPageSize);
}

const onDetailClick = (index: number, row: FlowNodeResultType) => {

  if (row.serviceType == 'ModelNode') {
    descriptionsVisible.value.model = true;
  } else if (row.serviceType == 'ForEndNode') {
    descriptionsVisible.value.forEnd = true;
  }
  rowDetail.value = row;
}

</script>

<style scoped>

</style>