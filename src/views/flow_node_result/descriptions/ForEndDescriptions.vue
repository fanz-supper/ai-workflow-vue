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
          <el-tag type="warning">输出:</el-tag>
        </template>

        <el-row>
          <el-col :span="22">
            <el-tabs ref="outputTabs" v-model="activeName" @tabChange="onTabChange">
              <el-tab-pane v-for="(item,index) in items" :label="index" :name="`_${index}`">
              </el-tab-pane>
            </el-tabs>
          </el-col>
<!--          <el-col :span="2">-->
<!--            <el-button size="small">markdown</el-button>-->
<!--          </el-col>-->
        </el-row>

<!--        <el-input style="margin-top: 8px" type="textarea" rows="25" v-model="itemV" readonly/>-->
        <div class="output-content">
          <el-scrollbar max-height="600px">
            <vue-markdown :source="itemV" class="output-content-markdown"></vue-markdown>
          </el-scrollbar>
        </div>

      </el-descriptions-item>

    </el-descriptions>
  </el-drawer>
</template>

<script setup lang="ts">

import {ref} from "vue";
import type {FlowNodeResultType} from "@/views/flow_node_result/base";
import flowNodeResultApi from "@/api/flow_node_result";
import VueMarkdown from 'vue-markdown-render'

const props = defineProps(['resultId']);
const resultDetail = ref(<FlowNodeResultType>{});
const activeName = ref('');
const items = ref<string[]>([]);
const itemV = ref('');
const visible = defineModel({required: true});


const onOpen = () => {
  activeName.value = "_0"
  flowNodeResultApi.queryById({id: props.resultId})
      .then(res => {
        resultDetail.value = res.data.result;
        items.value = JSON.parse(resultDetail.value.output).list;
        onTabChange();
      })
}
const onTabChange = () => {
  itemV.value = items.value[Number(activeName.value.substring(1))];
}

</script>

<style scoped>
.output-content {
  width: 500px;
  border: darkgray 1px solid;
}

.output-content-markdown {
  padding: 5px;
}

</style>