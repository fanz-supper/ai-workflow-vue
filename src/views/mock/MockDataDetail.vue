<template>
  <el-dialog v-model="visible" title="Mock Data Detail" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="自定义名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="模型类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option value="CHAT">语言模型</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组件(多选)">
        <el-select v-model = "form.componentIds" placeholder="请选择"
                   multiple
                   filterable
                   :reserve-keyword="false"
                   tag-type="warning">
          <el-option v-for="component in components" :label="component.name" :value="component.id" :key="component.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据TEXT">
        <el-input type="textarea" :rows="20" v-model="form.data"/>
      </el-form-item>

    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="success" @click="onRun" plain>运行</el-button>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import mockDataApi from "@/api/mock_data";
import modelApi from "@/api/model";
import type {MockDataType} from "@/views/mock/base.ts";

interface ComponentInfo {
  id: string,
  name: string;
}

const visible = defineModel();

const props = defineProps(['data']);
const form = ref(<MockDataType>{});
const components = ref<ComponentInfo[]>([]);

onMounted(() => {
  modelApi.all<ComponentInfo[]>()
      .then(res => {
        components.value = res.data.result;
      })
})

const onSubmit = () => {

  if (form.value.id) {
    mockDataApi.update(form.value);
  } else {
    mockDataApi.add(form.value);
  }
  visible.value = false;
}

const onRun = () => {
  mockDataApi.run(form.value)
  visible.value = false;
}

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