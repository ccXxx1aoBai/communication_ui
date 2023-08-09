import { createStore } from 'vuex'
import createVuexAlong from 'vuex-along'
import getters from './getters'
import user from './modules/user'
import socket from './modules/socket'

export default createStore({
  modules: {
    user,
    socket
  },
  getters,
  plugins: [createVuexAlong()]
})
