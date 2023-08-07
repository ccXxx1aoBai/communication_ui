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

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.name == 'login') {
    next()
    return
  }else {
    if(store.getters.token) {
      if(router.getRoutes().length > 2) {
        next()
        return
      }else {
        store.dispatch('getRoute', store).then((routes : Menus[]) => {
          const list : any = getRoutes(routes)
          for(let i = 0; i < list.length; i++) {
            router.addRoute('layout', list[i]);
          }
          next({ replace: true, ...to });
        })
        return
      }
    }else {
      next('/')
      return
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
