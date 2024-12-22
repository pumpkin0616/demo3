
import Vue from 'vue';

const home = {
  namespaced: true,
  state: {
    userInfo: {
      username: '',
      token: ''
    }
  },
  getters: {
    // menuIsOpen: state => state?.userInfo
  },
  mutations: {

    SET_USERINFO (state, payload) {
      Vue.set(state, 'userInfo', payload);
    },
    REMOVE_USERINFO (state) {
      Vue.set(state, 'userInfo', {});
    }

  },
  actions: {


  }
};

export default home;
