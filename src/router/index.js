import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import routes from './routes.js';

if (!process || process.env.NODE_ENV !== 'test') {
    Vue.use(VueRouter);
}

const scrollBehavior = (to, from, savedPosition) => {
    let positionY = 0;

    if (to.hash) {
        positionY = to.hash;
    } else if (savedPosition) {
        positionY = savedPosition.y;
    }

    // mounted 이후에 랜더링이 되는경우 컴포넌트에서 직접 스크롤해줘야 하므로 query에 이전 position 정보를 담아둔다.
    // eslint-disable-next-line no-param-reassign
    to.query.rememberPositionY = positionY;

    return goTo(positionY);
};

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior,
});

export default router;
