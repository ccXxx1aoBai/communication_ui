<template>
  <div class="bar">
    <div class="user">
      <div class="avatar">
        <img :src="avatar" class="avatar_img">
      </div>
      <div class="info">
        <el-dropdown>
          <p class="name">
            <span>{{ userName }}</span>
            <el-icon>
              <caret-bottom />
            </el-icon>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { useStore } from 'vuex';
import { ref } from 'vue'

const store = useStore();
const userName = ref(store.getters.nickname)
const avatar = ref('/api' + store.getters.avatar)
</script>
  
<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  .user {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
  }

  .avatar_img {
    width: 100%;
    height: 100%;
  }

  .info {
    margin-left: 15px;

    .name {
      display: flex;
      align-items: center;
      font-size: 18px;
      outline: none;
    }
  }
}
</style>