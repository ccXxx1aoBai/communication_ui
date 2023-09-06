export default {
  state: {
    socket: '',
  },
  mutations: {
    SET_SOCKET: (state: any, data: any) => {
      state.socket = data;
    }
  },
  actions: {
    connectionSocket: async (store: any, userId: any) => {
      if(store.state.socket == null) {
        let socket = new WebSocket(`${import.meta.env.VITE_BASE_WS}/socket/${userId}`)
        socket.onopen = () => {
          (window as any).socket || ((window as any).socket = socket)
          console.log('连接成功');
        }
        socket.onclose = () => {
          store.commit('SET_SOCKET', null)
          console.log('断开连接');
        }
        store.commit('SET_SOCKET', socket)
      }
    },
    closeSocket: (store: any) => {
      store.state?.socket?.close && store.state?.socket?.close()
      store.commit('SET_SOCKET', null)
    }
  },
}