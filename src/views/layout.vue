<template>
  <div class="layout">
    <el-container style="height: 100vh;">
      <el-header>
        <header-bar />
      </el-header>
      <el-container style="height: 100%;">
        <el-aside width="200px">
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
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useStore } from "vuex";
import AesUtil from '@/utils/AesUtil';
import { ElMessageBox } from 'element-plus';

const store = useStore()
const router = useRouter()
store.dispatch('connectionSocket', store.getters.id)
store.getters.socket.onmessage = ({ data }: any) => {
  console.log('接收消息', data);
  const message: Message = JSON.parse(AesUtil.decrypt(data))
  if (message.body.type == -1) {
    store.getters.socket.close()
    store.dispatch('clear')
    ElMessageBox.alert('当前账号已被强制下线', '系统提示', {}).then(() => {
      router.replace('/')
    })
  }
}

const route = useRoute();
let title = ref<String | null | undefined | unknown>(route.meta?.title);
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
  background-color: #F8F8F9;
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