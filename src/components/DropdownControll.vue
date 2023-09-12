<template>
  <el-dropdown :show-timeout="50">
    <el-icon>
      <more-filled />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-button icon="edit" text class="waring" @click="handleEdit(row)">修改</el-button>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button icon="delete" text class="delete" @click="handleDel(row)">删除</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
  
<script setup lang='ts'>

const { row } = withDefaults(defineProps<{
  row: any
}>(), {
  row: {}
})

const emits = defineEmits(['edit', 'remove'])
const handleEdit = (row : any) => {
  emits('edit', row)
}
const handleDel = (row : any) => {
  emits('remove', row);
}
</script>