<template>
  <el-dialog v-model="visible" title="模型节点" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="节点名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="模型类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option value="qwen2.5">qwen2.5</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据解析器">
        <el-select v-model="form.dataConverterId" placeholder="请选择" clearable>
          <el-option value="JavaYaml">JavaYaml</el-option>
          <el-option value="DomainListYaml">DomainListYaml</el-option>
          <el-option value="ETLYaml">ETLYaml</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提示词模板(可选)">
        <el-select v-model="form.promptTemplateId" placeholder="请选择"
                   :loading="promptTemplateIdRemoteLoading"
                   @visible-change="promptTemplateIdRemote"
                   clearable
        >
          <el-option v-for="item in promptTemplateOptions" :value="item.id" :label="item.name" :key="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="提示词(可选)">
        <el-input v-model="form.msg" type="textarea" :rows="10"/>
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
import type {ModelDetailType} from "@/views/model/base.ts";
import modelApi from "@/api/model";
import promptTemplateApi from "@/api/prompt_template";

const visible = defineModel();

interface PromptTemplateItem {
  id: string,
  name: string;
}

const promptTemplateOptions = ref<PromptTemplateItem[]>([])
const promptTemplateIdRemoteLoading = ref(false);

const promptTemplateIdRemote = (visible: boolean) => {

  if (visible) {
    promptTemplateIdRemoteLoading.value = true;
    promptTemplateApi.all()
        .then((res) => {
          promptTemplateOptions.value = res.data.result
          promptTemplateIdRemoteLoading.value = false;
        })
  }
}

const props = defineProps(['data']);
const form = ref(<ModelDetailType>{});

const onSubmit = () => {

  if (form.value.id) {
    modelApi.update(form.value);
  } else {
    modelApi.add(form.value);
  }
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