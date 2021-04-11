import Vue from 'vue';
import App from './App.vue';
import { vuetify } from './plugins/vuetify';
import router from './router';
import store from './store';

import './font/roboto.css';
import './font/fonts.css';
import './style/style.scss';
import './style/vuetify-override.scss';
import '@/utils/prototype.ts';
import { AxiosUtils } from '@/utils/axios';

Vue.config.productionTip = false;

AxiosUtils.init();

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
