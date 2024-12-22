
import Vue from 'vue';

const home = {
  namespaced: true,
  state: {
    menuIsOpen: false
  },
  getters: {
    // menuIsOpen: state => state?.menuIsOpen
  },
  mutations: {
    // SET_ROLES: (state, roles) => {
    //     state.roles = roles;
    // },
    UPDATE_DATA (state, { key, value }) {
      // state.menuIsOpen = value;
      Vue.set(state, key, value);
    }
    // SET_BROWSERHEADERTITLE: (state, action) => {
    //     state.browserHeaderTitle = action.browserHeaderTitle;
    // },
    // SET_NAME: (state, name) => {
    //   state.name = name;
    // },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar;
    // }
  },
  actions: {
      // // 登出
      // LogOut ({ commit, reqData }) {
      //   return new Promise((resolve, reject) => {
      //     logout(reqData).then(response => {
      //       commit('SET_ROLES', []);
      //       removeToken('Token');
      //       resolve();
      //     });
      //   });
      // },
      // // 动态修改权限;本实例中,role和token是相同的;
      // ChangeRoles ({ commit }, role) {
      //   return new Promise(resolve => {
      //     const token = role;
      //     setToken("Token", token);
      //     getUserInfo({ token: token }).then(res => {
      //       const data = res.data.userList;
      //       commit('SET_ROLES', data.roles);
      //       commit('SET_NAME', data.name);
      //       commit('SET_AVATAR', data.avatar);
      //       resolve();
      //     });
      //   });
      // },

  }
};

export default home;
