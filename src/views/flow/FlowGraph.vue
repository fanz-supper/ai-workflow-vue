<template>
  <el-row style="margin-bottom: 10px">
    <el-col :span="1">
      <el-tag type="primary" @click="onBack">
        << 返回
      </el-tag>
    </el-col>
    <el-col :offset="1" :span="3">
      <el-input v-model="flowData.name" placeholder="请输入" size="small">
        <template #prepend>
          <el-text type="warning" size="small">名称</el-text>
        </template>
      </el-input>
    </el-col>

    <el-col :offset="14" :span="1">
      <el-button size="small" @click="onRun" type="warning">
        运行
      </el-button>
    </el-col>
    <el-col :span="1">
      <el-button size="small" @click="onSave" type="primary">
        保存
      </el-button>
    </el-col>

  </el-row>
  <div @drop="onDrop">
    <el-row style="height: 80vh;">
      <el-col :span="3" style="background-color: #EEEEEE">
        <Sidebar class="vue-flow-sidebar"/>
      </el-col>
      <el-col :span="18">
        <VueFlow class="vue-flow-graph"
                 :connectionLineOptions="lineOptions"
                 @dragover="onDragOver" @dragleave="onDragLeave">

          <Background bg-color="#F1F5FB"></Background>
          <template #node-special="specialNodeProps">
            <SpecialNode v-bind="specialNodeProps" @click-node="clickNode"/>
          </template>

          <ModelDrawer v-model="isModelDrawer" :node-info="selectedNodeInfo" />
          <FileWriteDrawer v-model="isFileWriteDrawer" :node-info="selectedNodeInfo"/>
          <DefaultDrawer v-model="isDefaultDrawer" :node-info="selectedNodeInfo"/>
        </VueFlow>
      </el-col>
    </el-row>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {MarkerType, Panel, useVueFlow, VueFlow} from '@vue-flow/core'
import {Document} from "@element-plus/icons-vue";

import SpecialNode from "@/views/flow/SpecialNode.vue";
import {Background} from "@vue-flow/background";
import ModelDrawer from "@/views/flow/drawer/ModelDrawer.vue";
import useDragAndDrop from "@/views/flow/useDnD.ts";
import Sidebar from "@/views/flow/Sidebar.vue";
import FileWriteDrawer from "@/views/flow/drawer/FileWriteDrawer.vue";
import DefaultDrawer from "@/views/flow/drawer/DefaultDrawer.vue";
import flowApi from "@/api/flow"
import {useRoute, useRouter} from "vue-router";
import type {FlowType} from "@/views/flow/base.ts";

const {onDragOver, onDrop, onDragLeave, isDragOver} = useDragAndDrop()
const {onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject, fromObject, updateNodeData} = useVueFlow()

const flowData = ref(<FlowType>{});

onMounted(() => {

  const id = useRoute().params.id;
  if (id) {
    flowApi.queryById<FlowType>({id: id})
        .then((res) => {
          const flowResult = res.data.result
          fromObject(JSON.parse(flowResult.canvas))
          flowData.value = flowResult;
        });
  }

})

const isModelDrawer = ref(false);
const isFileWriteDrawer = ref(false)
const isDefaultDrawer = ref(false)
const selectedNodeInfo = ref({});

const clickNode = (nodeInfo: any) => {

  isModelDrawer.value = (nodeInfo.serviceType === 'ModelNode');
  isFileWriteDrawer.value = (nodeInfo.serviceType === 'FileWriteNode');
  isDefaultDrawer.value = !(isModelDrawer.value || isFileWriteDrawer.value);

  selectedNodeInfo.value = nodeInfo;
}
const lineOptions = {
  style: {
    strokeWidth: 1.5,
  },
  markerEnd: {
    type: MarkerType.Arrow,
  }
}
onConnect((connection) => {

  const conn = {
    ...connection,
    ...lineOptions
  };
  addEdges(conn);
});
const onSave = () => {

  const graph = JSON.stringify(toObject());
  if (flowData.value.id) {
    flowApi.update({id: flowData.value.id, name: flowData.value.name, canvas: graph});
  } else {
    flowApi.add({name: flowData.value.name, canvas: graph});
  }

}

const onRun = () => {
  const graph = JSON.stringify(toObject());
  flowApi.run({id: flowData.value.id, name: flowData.value.name, canvas: graph});
}

const router = useRouter();
const onBack = () => {
  router.back()
}
</script>

<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

.vue-flow__node-default .source {
  background-color: red;
  border-radius: 0;
}

.vue-flow__node-default .target {
  background-color: blue;
  border-radius: 0;
}


</style>