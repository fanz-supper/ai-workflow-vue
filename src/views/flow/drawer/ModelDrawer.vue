<template>
  <el-drawer v-model="isOpened" :with-header="false" @open="onOpen" @closed="onClosed()">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="引用">
        <el-select v-model="form.modelNodeId" placeholder="请选择" @change="onModelSelectorChange" clearable>
          <el-option v-for="item in modelNodeOptions" :value="item.id" :label="item.name" :key="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="节点名">
        <el-input v-model="form.name" :disabled="isSelectedModel"/>
      </el-form-item>
      <el-form-item label="模型">
        <el-select v-model="form.type" placeholder="模型" :disabled="isSelectedModel">
          <el-option value="qwen2.5">qwen2.5</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据解析器">
        <el-select v-model="form.dataConverterId" placeholder="请选择" :disabled="isSelectedModel" clearable>
          <el-option value="JavaYaml">JavaYaml</el-option>
          <el-option value="DomainListYaml">DomainListYaml</el-option>
          <el-option value="ETLYaml">ETLYaml</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提示词模板">
        <el-select v-model="form.promptTemplateId" placeholder="请选择"
                   :disabled="isSelectedModel"
                   clearable>
          <el-option v-for="item in promptTemplateOptions" :value="item.id" :label="item.name" :key="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="提示词">
        <el-select placeholder="引用节点输出" v-model="form.msgExpression.nodeId" clearable>
          <template #label="{label}">
            {{ label }}
            <el-tag type="warning" size="small">output</el-tag>
          </template>

          <el-option v-for="node in refNodes" :value="node.id" :label="node.label" :key="node.id">
            {{ node.label }}
            <el-tag type="warning" size="small">output</el-tag>
          </el-option>
        </el-select>
        <el-text class="mx-1" type="info">或（二选一）</el-text>
        <el-input type="textarea" :rows="5" v-model="form.msg" :disabled="isSelectedModel"/>
      </el-form-item>

      <el-row>
        <el-col :offset="21">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-col>
      </el-row>

    </el-form>

  </el-drawer>
</template>

<script lang="ts" setup>
import {useVueFlow} from "@vue-flow/core";
import {useModelNodeForm} from './ts/useModelNodeForm.ts'

const isOpened = defineModel({required: true, default: false})
const props = defineProps(['nodeInfo']);

const {
  isSelectedModel,
  form,
  modelNodeOptions,
  promptTemplateOptions,
  refNodes,
  fillFormData,
  onModelSelectorChange,
  fetchModelNodes,
  fetchPromptTemplates,
  resetForm
} = useModelNodeForm();

const {updateNodeData, toObject} = useVueFlow();

const onOpen = () => {
  fetchModelNodes();
  fetchPromptTemplates();
  fillFormData(props.nodeInfo);
  onModelSelectorChange();
}

const onClosed = () => {
  resetForm();
}

const onSubmit = () => {
  updateNodeData(props.nodeInfo.id, {label: form.value.name, params: form.value})
  isOpened.value = false;
  console.log(toObject());
}
</script>
<style scoped>

</style>