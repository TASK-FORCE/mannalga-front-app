import store from '@/store/index.js';
import { LOGIN_PATH, MAIN_PAGE_PATH, REGISTER, SELECT_LOCATION_PATH, CLUB_PATH } from '@/router/route_path_type.js';
import { AUTH, IS_AUTH } from '@/store/type/auth_type.js';
import { SELECTED_LOCATIONS } from '@/store/type/user_type.js';

function validationAuthentication(to, from, next) {
    if (store.getters[`${AUTH}/${IS_AUTH}`]) {
        next();
    } else {
        next(`${LOGIN_PATH}?validationFail=true`);
    }
}

const routes = [
    {
        path: '/',
        redirect: LOGIN_PATH,
    },
    {
        path: LOGIN_PATH,
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: REGISTER.ROOT,
        name: 'Register',
        component: () => import('@/views/register/RegisterMain.vue'),
        beforeEnter: validationAuthentication,
        children: [
            {
                path: REGISTER.PROFILE,
                component: () => import('@/views/register/RegisterProfile.vue'),
                meta: { isFirstPage: true },
            },
            {
                path: REGISTER.LOCATION,
                component: () => import('@/views/register/RegisterLocation.vue'),
            },
            {
                path: REGISTER.INTEREST,
                component: () => import('@/views/register/RegisterInterest.vue'),
                meta: { isLastPage: true },
            },
        ],
    },
    {
        path: SELECT_LOCATION_PATH,
        name: 'SelectLocation',
        component: () => import('@/views/SelectLocation.vue'),
    },
    {
        path: MAIN_PAGE_PATH,
        name: 'AppMain',
        component: () => import('@/views/AppMain.vue'),
    },
    {
        path: CLUB_PATH,
        name: 'ClubMain',
        component: () => import('@/views/club/ClubMain.vue'),
        props: true,
    },
];

export default routes;
