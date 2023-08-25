import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/assets/css/index.scss'
import "nprogress/nprogress.css";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as Icon from '@/components/svg'
import './global.d.ts'
import DropdownControll from '@/components/DropdownControll.vue'

const app = createApp(App);
for(const [key, component] of Object.entries(Icon)) {
  app.component(key, component)
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('DropdownControll', DropdownControll)

app
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app');
