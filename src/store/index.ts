import { createStore } from 'vuex'
import createVuexAlong from 'vuex-along'
import getters from './getters'
import user from './modules/user'

export default createStore({
  modules: {
    user
  },
  getters,
  plugins: [createVuexAlong()]
})
