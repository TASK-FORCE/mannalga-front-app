import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import scrollHelper from '@/utils/ScrollHelper.js';
import routes from './routes.js';

if (!process || process.env.NODE_ENV !== 'test') {
    Vue.use(VueRouter);
}

const scrollBehavior = (to, from) => {
    scrollHelper.save(from.fullPath);

    const positionY = scrollHelper.get(to.fullPath) || 0;

    if (positionY === 0) {
        return new Promise(
            (resolve) => setTimeout(
                () => resolve(window.scrollTo({ top: 0 })), 100,
            ),
        );
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(window.scrollTo({ top: 0 }));
        }, 100);
        setTimeout(() => {
            resolve(goTo(positionY));
        }, 300);
    });
};

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior,
});

export default router;
