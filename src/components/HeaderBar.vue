<template>
  <div class="bar">
    <div class="bar-l">
      <img src="@/assets/logo.png" alt="logo">
    </div>
    <div class="user">
      <div class="avatar">
        <img :src="avatar" class="avatar_img">
      </div>
      <div class="info">
        <el-dropdown @command="handleMenu">
          <p class="name">
            <span>{{ userName }}</span>
            <el-icon>
              <caret-bottom />
            </el-icon>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">修改密码</el-dropdown-item>
              <el-dropdown-item command="0">退出</el-dropdown-item>
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
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const store = useStore();
const userName = ref(store.getters.nickname)
const avatar = ref('/api' + store.getters.avatar)
const router = useRouter()
const handleMenu = (command : String | Number) => {
  if(command == '0') {
    ElMessageBox.confirm('是否退出当前账号？', '系统提示').then(() => {
      router.replace('/')
    })
  }
}
</script>
  
<style lang="scss" scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;

  .bar-l {
    width: 100%;

    img {
      width: 48px;
      height: 48px;
      border-radius: 10px;
    }
  }

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
      cursor: pointer;
    }
  }
}
</style>