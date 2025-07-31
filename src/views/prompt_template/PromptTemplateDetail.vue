
<template>
  <el-dialog v-model="visible" title="提示词模板" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="自定义名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="模板">
        <el-input v-model="form.template" type="textarea" :rows="20"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import type {PromptTemplateType} from "@/views/prompt_template/base.ts";
import promptTemplateApi from "@/api/prompt_template";

const visible = defineModel();
const props = defineProps(['data']);
const form = ref(<PromptTemplateType>{})

const onSubmit = () => {
  if (form.value.id) {
    promptTemplateApi.update(form.value);
  } else {
    promptTemplateApi.add(form.value);
  }
  visible.value = false;
}

watch(
    () => props.data,
    (newVal, oldVal) => {form.value = newVal},
    {immediate: true}
)

</script>




<style scoped>

</style>