<template>
  <div class="nav-container">
    <el-row>
      <el-col :span="22">
        <el-menu
            default-active="2"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
        >
          <el-menu-item index="/promptTemplateMain">
            <el-icon>
              <NavigationIcon :src="PromptSrc" />
            </el-icon>
            <span>提示词列表</span>
          </el-menu-item>
          <el-menu-item index="/modelMain">
            <el-icon>
              <NavigationIcon :src="ModelSrc" />
            </el-icon>
            <span>模型节点列表</span>
          </el-menu-item>
          <el-sub-menu index="flow">
            <template #title>
              <el-icon>
                <NavigationIcon :src="FlowSrc" />
              </el-icon>
              工作流
            </template>
            <el-menu-item index="/flowMain">
              <el-icon>
                <NavigationIcon :src="FlowSrc" />
              </el-icon>
              <span>工作流列表</span>
            </el-menu-item>
            <el-menu-item index="/flowResultMain">
              <el-icon>
                <NavigationIcon :src="FlowSrc" />
              </el-icon>
              <span>工作流执行列表</span>
            </el-menu-item>
            <el-menu-item index="/flowNodeResultMain">
              <el-icon>
                <NavigationIcon :src="FlowSrc" />
              </el-icon>
              <span>工作流节点执行列表</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="mockData">
            <template #title>
              <el-icon>
                <NavigationIcon :src="DataSrc" />
              </el-icon>
              数据测试
            </template>
            <el-menu-item index="/mockDataMain">
              <el-icon>
                <NavigationIcon :src="ResultSrc" />
              </el-icon>
              <span>数据测试列表</span>
            </el-menu-item>
            <el-menu-item index="/mockResultMain">
              <el-icon>
                <NavigationIcon :src="ResultSrc" />
              </el-icon>
              <span>数据测试结果列表</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import NavigationIcon from '@/icon/NavigationIcon.vue';
import DataSrc from '@/icon/data.png'
import FlowSrc from '@/icon/flow.png'
import ModelSrc from '@/icon/model.png'
import NodeSrc from '@/icon/node.png'
import PromptSrc from '@/icon/prompt.png'
import ResultSrc from '@/icon/result.png'

const props = defineProps(['router'])
const router = props.router!!;

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  console.log(router)
  router.push({path: key})
}

</script>

<style scoped>

</style>