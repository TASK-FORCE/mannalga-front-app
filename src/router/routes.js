import store from '@/store';

function validationAuthentication(to, from, next) {
    if (store.getters['auth/isAuth']) {
        next();
    } else {
        next('/login?validationFail=true');
    }
}

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        beforeEnter: (to, from, next) => { // TODO DELETE
            localStorage.clear();
            next();
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        beforeEnter: validationAuthentication,
    },
];

export default routes;
