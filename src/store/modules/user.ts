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
    SET_TOKEN: (state : any, data : string) => {
      state.token = data;
    },
    SET_ID: (state : any, data : string) => {
      state.id = data;
    },
    SET_USERNAME: (state : any, data : string) => {
      state.username = data;
    },
    SET_NICKNAME: (state : any, data : string) => {
      state.nickname = data;
    },
    SET_PASSWORD: (state : any, data : string) => {
      state.password = data;
    },
    SET_ROLE: (state : any, data : string) => {
      state.role = data;
    },
    SET_ROLENAME: (state : any, data : string) => {
      state.roleName = data;
    },
    SET_AVATAR: (state : any, data : string) => {
      state.avatar = data;
    },
    SET_PHONE: (state: any, data : string) => {
      state.phone = data
    },
    SET_ROUTES: (state : any, data : any) => {
      state.routes = data;
    }
  },
  actions: {
    storeInfo: ({ commit } : any, data : any) => {
      const {
        id,
        nickname,
        username,
        role,
        roleName,
        phone,
        avatar,
      } = data;
      commit('SET_ID', id);
      commit('SET_NICKNAME', nickname);
      commit('SET_USERNAME', username);
      commit('SET_ROLE', role);
      commit('SET_ROLENAME', roleName);
      commit('SET_AVATAR', avatar);
      commit('SET_PHONE', phone)
      console.log(111, data);
    },
    storeToken: ({ commit } : any, data : string) => {
      commit('SET_TOKEN', data);
    },
    storeRoutes: ({ commit } : any, data : any) => {
      console.log(data);
      const parent : any = [];
      data.forEach((item : any) => {
        if(item.parent == '0') {
          parent.push(item);
        }
      })
      parent.sort((a : any, b : any) => {
        return a.sort - b.sort;
      })
      parent.forEach((item : any) => {
        const children : any = [];
        data.forEach((child : any) => {
          if(item.id == child.parent) {
            children.push(child);
          }
        })
        children.sort((a : any, b : any) => {
          return a.sort - b.sort;
        })
        item.children = children;
      })
      console.log(parent);
      commit('SET_ROUTES', parent);
    },
  },
}