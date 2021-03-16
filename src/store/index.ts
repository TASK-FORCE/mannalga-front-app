import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import { MyStore } from '@/store/type/types';

Vue.use(Vuex);

const store: MyStore = new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
});

export default store;
