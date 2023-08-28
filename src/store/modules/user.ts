import AesUtil from "@/utils/AesUtil";
import { getRoute } from '@/api/common';
import { getInfo } from '@/api/user'

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
    user: {},
    roleLabel: ''
  },
  mutations: {
    SET_TOKEN: (state: any, data: string) => {
      state.token = AesUtil.encrypt(data);
    },
    SET_ID: (state: any, data: string) => {
      state.id =  AesUtil.encrypt(data);
    },
    SET_USERNAME: (state: any, data: string) => {
      state.username = AesUtil.encrypt(data);
    },
    SET_NICKNAME: (state: any, data: string) => {
      state.nickname = AesUtil.encrypt(data);
    },
    SET_PASSWORD: (state: any, data: string) => {
      state.password = AesUtil.encrypt(data);
    },
    SET_ROLE: (state: any, data: string) => {
      state.role = AesUtil.encrypt(data);
    },
    SET_ROLENAME: (state: any, data: string) => {
      state.roleName = AesUtil.encrypt(data);
    },
    SET_AVATAR: (state: any, data: string) => {
      state.avatar = AesUtil.encrypt(data);
    },
    SET_PHONE: (state: any, data: string) => {
      state.phone = AesUtil.encrypt(data);
    },
    SET_ROUTES: (state: any, data: any) => {
      state.routes = data;
    },
    SET_USER: (state: any, data: any) => {
      state.user = AesUtil.encrypt(data);
    },
    SET_ROLELABEL: (state: any, data: any) => {
      state.roleLabel = AesUtil.encrypt(data);
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
        roleLabel
      } = data;
      commit('SET_ID', id);
      commit('SET_NICKNAME', nickname);
      commit('SET_USERNAME', username);
      commit('SET_ROLE', role);
      commit('SET_ROLENAME', roleName);
      commit('SET_ROLELABEL', roleLabel)
      commit('SET_AVATAR', import.meta.env.VITE_FILE + avatar);
      commit('SET_PHONE', phone)
      commit('SET_USER', JSON.stringify(data))
    },
    storeToken: ({ commit }: any, data: string) => {
      commit('SET_TOKEN', data);
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
      commit('SET_USER', {})
      // localStorage.clear()
    },
    getUserInfo: ({ commit, dispatch }: any) => {
      getInfo().then((res: Res) => {
        if(res.code === 200) {
          const {
            id,
            nickname,
            username,
            role,
            roleName,
            phone,
            avatar,
            roleLabel
          } = res.data;
          dispatch('connectionSocket', res.data.id)
          commit('SET_ID', id);
          commit('SET_NICKNAME', nickname);
          commit('SET_USERNAME', username);
          commit('SET_ROLE', role);
          commit('SET_ROLENAME', roleName);
          commit('SET_ROLELABEL', roleLabel)
          commit('SET_AVATAR', import.meta.env.VITE_FILE + avatar);
          commit('SET_PHONE', phone)
          commit('SET_USER', JSON.stringify(res.data))
        }
      })
    }
  },
}