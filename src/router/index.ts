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
  if(to.fullPath == from.fullPath) {
    next()
  }
  if(to.name == 'login') {
    next()
  }else {
    if(store.getters.token) {
      if(router.getRoutes().length > 2) {
        next()
      }else {
        await store.dispatch('getRoute', store).then((res : Res) => {
          if(res.code === 200) {
            console.log(res.data);
            store.dispatch('storeRoutes', res.data)
            const list : any = getRoutes(res.data)
            list.forEach((route : any) => {
              router.addRoute('layout', route);
            })
            // next({ replace: true, ...list[0] });
          }
        })
        next({ replace: true, ...to });
      }
    }else {
      next('/')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
