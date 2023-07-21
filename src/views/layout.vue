<template>
  <div class="layout">
    <el-container style="height: 100vh;">
      <el-header>
        <header-bar />
      </el-header>
      <el-container style="height: 100%;">
        <el-aside width="auto">
          <nav-menu />
        </el-aside>
        <el-main>
          <div class="panel-title">
            {{ title }}
          </div>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang='ts'>
import NavMenu from '@/components/NavMenu.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const route = useRoute();
let title = ref(route.meta?.title);
watch(route, (val) => {
  title.value = val.meta?.title;
})

</script>
  
<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid #E7E7E7;
}

.el-main {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

.logo {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-title {
  padding: 5px 14px;
  font-size: 28px;
}
</style>