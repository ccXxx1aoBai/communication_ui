import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from "nprogress";
import store from '@/store'
import { getRoutes } from "@/utils/util";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/commons/login.vue')
  }, {
    path: '/index',
    name: 'layout',
    component: () => import('@/views/layout.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if(to.name == 'login') {
    next()
  }else {
    if(store.getters.token) {
      if(router.getRoutes().length > 2) {
        next()
      }else {
        await store.dispatch('getRoute', store).then((res : Res) => {
          if(res.code === 200) {
            store.dispatch('storeRoutes', res.data)
            const list : any = getRoutes(res.data)
            list.forEach((route : any) => {
              router.addRoute('layout', route);
            })
            console.log(router.getRoutes());
            console.log(router.getRoutes().length);
          }
        })
        next({ replace: true, ...to });
      }
    }else {
      next('/')
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
