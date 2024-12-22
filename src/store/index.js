import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import login from './modules/login';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);
export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    home,
    login
  },
  plugins: [
    createPersistedState({ // vuex插件，存到localstorage中
      key: 'info',
      paths: ['login']
    }) // 使用插件
  ]
});
