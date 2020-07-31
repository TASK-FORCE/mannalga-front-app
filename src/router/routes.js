import { isAuth } from '@/utils/authUtils.js';

function validationAuthentication(to, from, next) {
    if (isAuth()) {
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
            next();
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/register/RegisterMain.vue'),
        beforeEnter: validationAuthentication,
        children: [
            {
                path: 'profile',
                component: () => import('@/views/register/RegisterProfile.vue'),
                meta: { isFirstPage: true },
            },
            {
                path: 'location',
                component: () => import('@/views/register/RegisterLocation.vue'),
            },
            {
                path: 'interest',
                component: () => import('@/views/register/RegisterInterest.vue'),
                meta: { isLastPage: true },
            },
        ],
    },
];

export default routes;
