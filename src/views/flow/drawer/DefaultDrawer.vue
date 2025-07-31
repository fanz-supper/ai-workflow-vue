<template>
  <el-drawer v-model="isOpened" :with-header="false" @open="onOpen">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="节点名">
        <el-input v-model="form.name"/>
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

const isOpened = defineModel({required: true, default: false})
const props = defineProps(['nodeInfo']);
const {updateNodeData} = useVueFlow();
const form = ref({
  name: '',
});

const onOpen = () => {
  form.value.name = props.nodeInfo.data.label;
}

const onSubmit = () => {
  updateNodeData(props.nodeInfo.id, {label: form.value.name, params: form.value})
  isOpened.value = false;
}
</script>
<style scoped>

</style>