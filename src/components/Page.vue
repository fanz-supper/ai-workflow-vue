<template>

  <div class="page">
    <el-pagination background layout="prev, pager, next" v-model:current-page="currentPageRef"
                   :default-page-size="defPageSize"
                   :total="total"
                   @change="onChange"/>
  </div>

</template>

<script setup lang="ts">

import {ref, watch} from "vue";

const props = defineProps(['totalCount']);
const emits = defineEmits(['changePage']);
const currentPageRef = ref(1)
const total = ref(0)
const defPageSize = 20;
defineExpose({
  defPageSize
})

const onChange = () => {
  console.log(currentPageRef.value)
  emits('changePage', currentPageRef.value, defPageSize)
}

watch(
    () => props.totalCount,
    (newVal) => {
      total.value = newVal
    }
);

</script>

<style scoped>
.page {
  margin-top: 20px;
}

</style>