<template>
  <div>
    <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.name">
      <template #title>
        <i class="el-icon" v-if="data.icon">
          <component :is="data.icon"></component>
        </i>
        <span>{{ data.label }}</span>
      </template>
      <nav-menu-child v-for="child in data.children" :key="child.id" :data="child" :active="cur"></nav-menu-child>
    </el-sub-menu>
    <el-menu-item v-else :index="data.path">
      <i class="el-icon" v-if="data.icon">
        <component :is="data.icon" ></component>
      </i>
      <span>{{ data.label }}</span>
    </el-menu-item>
  </div>
</template>
  
<script setup lang='ts'>
import { computed } from 'vue';
const { data, active } = withDefaults(defineProps<{
  data: Menus,
  active: string | number
}>(), {
  data: () => {
    return {} as Menus
  },
  active: ''
})
const cur = computed(() => active)
</script>