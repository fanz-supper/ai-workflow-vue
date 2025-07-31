<template>

  <el-drawer v-model="visible" :with-header="false" @open="onOpen">

    <el-descriptions column="1">
      <el-descriptions-item>
        <template #label>
          <el-tag type="primary">节点名称:</el-tag>
        </template>
        {{ resultDetail.name }}
      </el-descriptions-item>
      <el-descriptions-item label="ResultId">
        <template #label>
          <el-tag type="primary">ResultId:</el-tag>
        </template>
        {{ resultDetail.resultId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-tag type="primary">ServiceType:</el-tag>
        </template>
        {{ resultDetail.serviceType }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-tag type="success">输入:</el-tag>
        </template>
        <el-input style="margin-top: 8px" type="textarea" rows="8" v-model="input.prompt" readonly/>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-tag type="warning">输出:</el-tag>
        </template>
        <el-input style="margin-top: 8px" type="textarea" rows="15" v-model="resultDetail.output" readonly/>
      </el-descriptions-item>

    </el-descriptions>
  </el-drawer>
</template>

<script setup lang="ts">

import {ref} from "vue";
import type {FlowNodeResultType} from "@/views/flow_node_result/base";
import flowNodeResultApi from "@/api/flow_node_result";

const props = defineProps(['resultId']);
const resultDetail = ref(<FlowNodeResultType>{});
const input = ref<{ prompt: string }>({prompt:''});
const visible = defineModel({required: true});

const onOpen = () => {
  flowNodeResultApi.queryById({id: props.resultId})
      .then(res => {
        resultDetail.value = res.data.result;
        input.value = JSON.parse(res.data.result.input);
      })
}

</script>

<style scoped>

</style>