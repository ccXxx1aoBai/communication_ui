import AesUtil from "@/utils/AesUtil";
import { getRoute } from '@/api/common';

export default {
  state: {
    token: '',
    id: '',
    username: '',
    password: '',
    role: '',
    roleName: '',
    avatar: '',
    nickname: '',
    phone: '',
    routes: [],
  },
  mutations: {
    SET_TOKEN: (state: any, data: string) => {
      state.token = data;
    },
    SET_ID: (state: any, data: string) => {
      state.id = data;
    },
    SET_USERNAME: (state: any, data: string) => {
      state.username = data;
    },
    SET_NICKNAME: (state: any, data: string) => {
      state.nickname = data;
    },
    SET_PASSWORD: (state: any, data: string) => {
      state.password = data;
    },
    SET_ROLE: (state: any, data: string) => {
      state.role = data;
    },
    SET_ROLENAME: (state: any, data: string) => {
      state.roleName = data;
    },
    SET_AVATAR: (state: any, data: string) => {
      state.avatar = data;
    },
    SET_PHONE: (state: any, data: string) => {
      state.phone = data
    },
    SET_ROUTES: (state: any, data: any) => {
      state.routes = data;
    }
  },
  actions: {
    storeInfo: ({ commit }: any, data: any) => {
      const {
        id,
        nickname,
        username,
        role,
        roleName,
        phone,
        avatar,
      } = data;
      commit('SET_ID', AesUtil.encrypt(id));
      commit('SET_NICKNAME', AesUtil.encrypt(nickname));
      commit('SET_USERNAME', AesUtil.encrypt(username));
      commit('SET_ROLE', AesUtil.encrypt(role));
      commit('SET_ROLENAME', AesUtil.encrypt(roleName));
      commit('SET_AVATAR', AesUtil.encrypt(avatar));
      commit('SET_PHONE', AesUtil.encrypt(phone))
    },
    storeToken: ({ commit }: any, data: string) => {
      commit('SET_TOKEN', AesUtil.encrypt(data));
    },
    getRoute: (store: any) => {
      const routes : Menus[] = []
      return new Promise((resolve, reject) => {
        getRoute({ role: store.getters.role }).then((res: Res) => {
          if(res.code === 200) {
            res.data.forEach((route : Menus) => {
              route.component && routes.push(route);
              route.children && routes.push(...route.children)
            })
            // store.dispatch('storeRoutes', res.data)
            res.data.sort((a : Menus, b : Menus) => {
              return a.sort - b.sort
            })
            store.commit('SET_ROUTES', res.data);
            resolve(routes)
          }
          reject(res.msg)
        }).catch((error: Error) => {
          reject(error)
        })
      })
    },
    clear: ({ commit }: any) => {
      commit('SET_ID', '');
      commit('SET_NICKNAME', '');
      commit('SET_USERNAME', '');
      commit('SET_ROLE', '');
      commit('SET_ROLENAME', '');
      commit('SET_AVATAR', '');
      commit('SET_PHONE', '');
      commit('SET_ROUTES', '');
      // localStorage.clear()
    }
  },
}