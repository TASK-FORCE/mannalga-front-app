import Vue from 'vue';
import VueRouter from 'vue-router';
import ScrollHelper from '@/utils/scroll/ScrollHelper.js';
import scrollRememberStore from '@/utils/scroll/ScrollRememberStore.js';
import routes from './routes.js';

if (!process || process.env.NODE_ENV !== 'test') {
    Vue.use(VueRouter);
}

const scrollBehavior = (to, from) => {
    if (from.meta && from.meta.disableScrollBehavior) return Promise.resolve();

    scrollRememberStore.save(from.fullPath);

    const positionY = scrollRememberStore.get(to.fullPath) || 0;

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
            resolve(ScrollHelper.scrollTo(positionY));
        }, 300);
    });
};

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior,
});

export default router;
