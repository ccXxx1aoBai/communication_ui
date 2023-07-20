<template>
  <div>
    <el-menu router :default-active="active" active-text-color="#A473E5">
      <nav-menu-child v-for="(menu, index) in data" :key="index" :data="menu"></nav-menu-child>
    </el-menu>
  </div>
</template>
  
<script setup lang='ts'>
import NavMenuChild from './NavMenuChild.vue';
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex'

const store = useStore()
const data = reactive(store.getters.routes)



const isCollapse = ref(false)
const route = useRoute();
let active = ref(route.fullPath)
watch(route, (val, oldVal) => {
  console.log(1, val, 2, oldVal);
})
</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;

  &:deep(.el-menu-item):hover {
    background-color: transparent;

    color: var(--el-color-primary);
  }
}
</style>