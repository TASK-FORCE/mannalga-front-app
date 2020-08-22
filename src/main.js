import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

import '@mdi/font/css/materialdesignicons.css';
import './font/roboto.css';
import './style/style.css';
import './style/vuetify-override.css';

Vue.config.productionTip = false;

// axios configuration
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_SERVER_URL;
axios.defaults.timeout = 3000;

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
