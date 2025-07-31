<template>


  <el-col :offset="20">
    <el-button type="primary" @click="onAddClick" plain>添加</el-button>
    <el-button type="primary" @click="onRefresh" plain>刷新</el-button>
  </el-col>
  <el-col :span="22">
    <el-table :data="tableData" style="width: 100%" :show-overflow-tooltip="true">
      <el-table-column type="index" label="No." width="50" />
      <el-table-column prop="id" label="Id" min-width="120" width="180"/>
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="status" label="Status"/>
      <el-table-column prop="template" label="Template"/>
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
  <PromptTemplateDetail v-model="detailVisible" :data="rowDetail"/>

</template>

<script lang="ts" setup>
import Page from '@/components/Page.vue'
import PromptTemplateApi from '@/api/prompt_template'
import {onMounted, ref} from "vue";
import PromptTemplateDetail from "@/views/prompt_template/PromptTemplateDetail.vue";
import type {PromptTemplateType} from "@/views/prompt_template/base.ts";

const tableData = ref([]);
const totalCount = ref(0);
const page = ref();

const onChangePage = (currentPage: number, pageSize: number) => {

  PromptTemplateApi.queryList({
    currentPage: currentPage,
    pageSize: pageSize,
  }).then(res => {
    tableData.value = res.data.result.list
    totalCount.value = res.data.result.total
  })
}

const initData = async () => {
  onChangePage(1, page.value.defPageSize);
};
onMounted(initData)

const rowDetail = ref(<PromptTemplateType>{});
const detailVisible = ref(false);

const onRefresh = () => {
  onChangePage(1, page.value.defPageSize);
}
const onAddClick = () => {
  detailVisible.value = true;
  rowDetail.value = <PromptTemplateType>{};
}

const onDetailClick = (index: number, row: PromptTemplateType) => {
  detailVisible.value = true;
  rowDetail.value = row;
}

</script>

<style scoped>

</style>