import Vue from 'vue';
import axios from 'axios';
import { setAppTokenAsDefaultHeader } from '@/utils/auth/authUtils.js';
import App from './App.vue';
import { vuetify } from './plugins/vuetify';
import router from './router';
import store from './store';

import '@mdi/font/css/materialdesignicons.css';
import './font/roboto.css';
import './style/style.scss';
import './style/vuetify-override.scss';
import '@/utils/prototype.js';

Vue.config.productionTip = false;

// s3 proxy를 위해 주석처리
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_SERVER_URL;
axios.defaults.baseURL = '/';
axios.defaults.timeout = process.env.VUE_APP_AXIOS_TIMEOUT;
setAppTokenAsDefaultHeader(axios.defaults.headers);

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
