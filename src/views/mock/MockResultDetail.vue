<template>
  <el-drawer v-model="visible" title="详情">
    <el-form :model="form" label-width="auto">
      <el-form-item label="组编号">
        <el-input v-model="form.groupId"/>
      </el-form-item>
      <el-form-item label="数据名">
        <el-input v-model="form.dataId"/>
      </el-form-item>
      <el-form-item label="组件名">
        <el-input v-model="form.componentId"/>
      </el-form-item>
      <el-form-item label="数据类型">
        <el-input v-model="form.type"/>
      </el-form-item>
      <el-form-item label="输入数据">
        <el-input type="textarea" :rows="5" v-model="form.data"/>
      </el-form-item>
      <el-form-item label="输出数据">
        <el-input type="textarea" :rows="20" v-model="form.result"/>
      </el-form-item>
    </el-form>
  </el-drawer>

</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import type {MockResultType} from "@/views/mock/base.ts";

const visible = defineModel();

const props = defineProps(['data']);
const form = ref(<MockResultType>{});

watch(
    () => props.data,
    (newVal, oldVal) => {
      form.value = newVal
    },
    {immediate: true}
)

</script>


<style scoped>

</style>