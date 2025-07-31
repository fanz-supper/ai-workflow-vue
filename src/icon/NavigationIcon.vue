<script setup lang="ts">

const props = defineProps(['src']);

</script>

<template>
  <el-image
      style="width: 18px; height: 18px"
      :src="props.src"
      :fit="'scale-down'"
  />
</template>

<style scoped>

</style>