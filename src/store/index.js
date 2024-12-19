import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';

Vue.use(Vuex);
export default new Vuex.Store({
  // state: {
  //   menuIsOpen: false
  // },
  // getters: {
  // },
  // mutations: {
  //   // updateState (state, { key, value }) {
  //   //   Vue.set(state, key, value);
  //   // }
  // },
  // actions: {
  // },
  modules: {
    home
  }
});
