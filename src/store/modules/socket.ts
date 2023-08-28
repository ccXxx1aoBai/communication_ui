import axios from 'axios'

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
    connectionSocket: async ({ commit }: any, data : any) => {
      if((window as any).socket == null) {
        let province = '安徽省'
        const tencent = await axios.get('/tencent/ws/location/v1/ip?key=LD4BZ-DV4K6-7F5S6-ESIQ7-PTNI6-QYFK2')
        if(tencent.data.status == 0) {
          province = tencent.data.result.ad_info.province
        }else {
          const gaode = await axios.get('https://restapi.amap.com/v3/ip?key=9a28127de62c54601b69026fd2ea4f33')
          if(gaode.data.status == 1) {
            province = gaode.data.province
          }else {
            const baidu = await axios.get('/baidu/location/ip?ak=9bGS2PrM76WAkBvO9z9fHwYPqSbLp57P')
            if(baidu.data.status == 0) {
              province = baidu.data.content.address_detail.province
            }
          }
        }
        const socket = new WebSocket(`${import.meta.env.VITE_BASE_WS}/socket/${data}/${province}`)
        socket.onopen = () => {
          (window as any).socket || ((window as any).socket = socket)
          console.log('连接成功');
        }
        socket.onclose = () => {
          (window as any).socket = null
          console.log('断开连接');
        }
        commit('SET_SOCKET', socket)
      }
    },
    closeSocket: () => {
      (window as any)?.socket.close()
    }
  },
}