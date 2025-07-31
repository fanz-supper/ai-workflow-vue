<script setup lang="ts" xmlns:el-col="http://www.w3.org/1999/html">
import {type NodeProps, useNodesData} from '@vue-flow/core'
import {Handle, Position} from '@vue-flow/core'
import {EditPen} from '@element-plus/icons-vue'


const props = defineProps<NodeProps>()
const emits = defineEmits(['clickNode'])
const nodeData = useNodesData(props.id);
const handleClick = () => {
  emits('clickNode', {id: props.id, serviceType: nodeData.value?.data.options.serviceType, data: nodeData.value?.data})
}
</script>

<template>
  <div class="vue-flow__node-default" :style="{backgroundColor: data.options.bgColor}">
    <el-row>
      <el-col :span="20">{{ data.options.name }}</el-col>
      <el-col :span="4">
        <el-icon @click="handleClick">
          <EditPen/>
        </el-icon>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">({{ nodeData?.data.label }})</el-col>
    </el-row>
    <Handle type="target" :position="Position.Top"/>
    <Handle type="source" :position="Position.Bottom"/>
  </div>

</template>

