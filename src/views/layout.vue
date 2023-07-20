<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto">
        <nav-menu></nav-menu>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang='ts'>
import NavMenu from '@/components/NavMenu.vue';
import { useStore } from 'vuex';

const store = useStore();
console.log(store);


</script>
  
<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  border-right: 2px solid #F5EFFC;
}
</style>