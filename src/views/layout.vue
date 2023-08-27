<template>
  <div class="layout">
    <el-container style="height: 100vh">
      <el-aside width="200px">
        <div class="logo">
          <img src="@/assets/logo.png" alt="logo" />
          <h1 class="system-name">后台管理系统</h1>
        </div>
        <nav-menu />
      </el-aside>
      <el-container style="height: 100%; overflow: hidden">
        <el-header>
          <header-bar />
        </el-header>
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

<script setup lang="ts">
import NavMenu from '@/components/NavMenu.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import AesUtil from '@/utils/AesUtil';
import { ElMessageBox } from 'element-plus';

const store = useStore();
const router = useRouter();
store.dispatch('connectionSocket', store.getters.id);
store.dispatch('getUserInfo');
store.getters.socket.onmessage = ({ data }: any) => {
  console.log('接收消息', data);
  const message: Message = JSON.parse(AesUtil.decrypt(data));
  if (message.body.type == -1) {
    store.getters.socket.close();
    store.dispatch('clear');
    ElMessageBox.alert('当前账号已被强制下线', '系统提示', {}).then(() => {
      router.replace('/');
    });
  }
};

const route = useRoute();
let title = ref<string | null | undefined | unknown>(route.meta?.title);
watch(route, (val) => {
  title.value = val.meta?.title;
});
</script>

<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid #e7e7e7;
}

.el-aside {
  background-color: #545c64;
}

.el-main {
  display: flex;
  flex-direction: column;
  background-color: #f8f8f9;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d1d1;
    border-radius: 14px;

    &:hover {
      background-color: #b1b1b1;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: #e7e7e7;
    border-radius: 14px;
  }
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

.logo {

  img {
    width: 32px;
    height: 32px;
    border-radius: 10px;
  }

  .system-name {
    margin-left: 10px;
    color: #ffffff;
    font-size: 14px;
  }
}
</style>
