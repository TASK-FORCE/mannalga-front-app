import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';

if (!process || process.env.NODE_ENV !== 'test') {
    Vue.use(VueRouter);
}

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    }
    return {
        x: 0,
        y: 0,
    };
};

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior,
});

export default router;
