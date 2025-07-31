<script setup lang="ts">
import Navigation from "@/views/Navigation.vue";
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
  <el-container class="home">
    <el-header class="tool">
      <el-row align="middle" class="tool-row">
        <el-col  :span="4">
          <span class="title">
          Flexi Flow
          </span>
        </el-col>
        <el-col :offset="17" :span="2">
           <span class="navigation">
             项目介绍
          </span>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="content">
      <el-aside class="content-navigation">
        <Navigation :router="router"></Navigation>
      </el-aside>
      <el-main class="content-panel">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.tool {
  background-color: #3F3EC3;
}
.tool-row {
  height: 100%;
}

.tool-row .title {
  font-size: 25px;
  font-weight: bold;
  color: #fff;
}
.tool-row .navigation {
  font-size: 15px;
  color: #fff;
}

.content {
  height: 80vh;
}

.content-navigation {
  width: 250px;
}
</style>