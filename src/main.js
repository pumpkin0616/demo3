import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import 'normalize.css';
import '@/assets/css/base.css';
import '@/assets/font/iconfont.css';
 // 完整导入 UI 组件库
 import VxeUI from 'vxe-pc-ui';
 import 'vxe-pc-ui/lib/style.css';
 // ...

 // 完整导入 表格库
 import VxeUITable from 'vxe-table';
 import 'vxe-table/lib/style.css';
 // ...
import './mock/index';

import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueCompositionAPI);
 Vue.use(VxeUI);
 Vue.use(VxeUITable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
