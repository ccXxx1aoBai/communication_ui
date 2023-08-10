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
    connectionSocket: ({ commit }: any, data : any) => {
      const socket = new WebSocket(`${import.meta.env.VITE_BASE_WS}/socket/${data}/合肥市`)
      socket.onopen = () => {
        (window as any).socket || ((window as any).socket = socket)
        console.log('连接成功');
      }
      socket.onclose = () => {
        (window as any).socket = null
        console.log('断开连接');
      }
      commit('SET_SOCKET', socket)
    },
  },
}