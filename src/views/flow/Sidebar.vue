<template>


  <el-text type="info">组件库</el-text>
  <el-row class="nodes" align="middle" justify="center">
    <el-col v-for="node in nodes" class="vue-flow__node-default" :style="{backgroundColor: node.bgColor}"
         :draggable="true"
         @dragstart="onDragStart($event, node.type, node)">
      {{ node.name }}
    </el-col>
  </el-row>

</template>

<script setup lang="ts">
import useDragAndDrop from './useDnD.js'

const {onDragStart} = useDragAndDrop()

const nodes = [
  {name: 'Model Node', serviceType: 'ModelNode', type: 'special', bgColor: '#B8F1D2'},
  {name: 'For Start Node', serviceType: 'ForStartNode', type: 'special', bgColor: '#CDD5E0'},
  {name: 'For End Node', serviceType: 'ForEndNode', type: 'special', bgColor: '#FCF098'},
  {name: 'File Write Node', serviceType: 'FileWriteNode', type: 'special', bgColor: '#F8D8B0'},
];
</script>


<style scoped>

.vue-flow__node-default {
  margin-top: 15px;
}

</style>
