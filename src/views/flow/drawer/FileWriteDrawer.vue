<template>
  <el-drawer v-model="isOpened" :with-header="false" @open="onOpen" @closed="onClosed">
    <el-form ref="formRef" :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="节点名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="系统路径">
        <el-input v-model="form.dir"/>
      </el-form-item>

      <el-form-item label="内容">
        <el-select placeholder="引用节点输出" v-model="form.contentExpression" disabled>
          <el-option v-for="op in options" :label="op.label" :value="op.value"/>
        </el-select>
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
import {ref} from "vue";
import type {FormInstance} from "element-plus";


const options = [{label: '前节点输出', value: 'pre,output'}]
const isOpened = defineModel({required: true, default: false})
const props = defineProps(['nodeInfo']);
const {updateNodeData} = useVueFlow();
const form = ref({
  name: '',
  dir: '',
  contentExpression: options[0].value
});

const onOpen = () => {
  const params = props.nodeInfo.data?.params
  if (params) {
    form.value = params;
  }
  form.value.name = props.nodeInfo.data.label;
}

const formRef = ref();
const onClosed = () => {
  if (!formRef) return
  formRef.value.resetFields()
}

const onSubmit = () => {
  updateNodeData(props.nodeInfo.id, {label: form.value.name, params: form.value})
  isOpened.value = false;
}
</script>
<style scoped>

</style>