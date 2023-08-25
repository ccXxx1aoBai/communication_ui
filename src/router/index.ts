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
    children: [
      {
        path: '/info',
        name: 'info',
        component: () => import('@/views/commons/info.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to', to);
  NProgress.start()
  if(to == from) {}
  if(to.name == 'login') {
    store.dispatch('clear')
    next()
    return
  }else {
    if(store.getters.token) {
      console.log(router.getRoutes().length);
      console.log(store.getters.routes);
      if(router.getRoutes().length > 2 && store.getters.routes) {
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
