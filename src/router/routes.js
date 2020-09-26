import { CLUB_BOARD_CREATE_PATH, CLUB_BOARD_POST_PATH, CLUB_CREATE_PATH, CLUB_PATH, LOGIN_PATH, MAIN_PATH, REGISTER_PATH, SELECT_LOCATION_PATH } from '@/router/route_path_type.js';
import { getterHelper } from '@/store/helper/getterHelper.js';

function validationAuthentication(to, from, next) {
    if (getterHelper.isAuth()) {
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
        path: REGISTER_PATH.ROOT,
        name: 'Register',
        component: () => import('@/views/register/RegisterMain.vue'),
        beforeEnter: validationAuthentication,
        children: [
            {
                path: REGISTER_PATH.PROFILE,
                component: () => import('@/views/register/RegisterProfile.vue'),
                meta: { isFirstPage: true },
            },
            {
                path: REGISTER_PATH.LOCATION,
                component: () => import('@/views/register/RegisterLocation.vue'),
            },
            {
                path: REGISTER_PATH.INTEREST,
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
        path: MAIN_PATH,
        name: 'AppMain',
        component: () => import('@/views/AppMain.vue'),
    },
    {
        path: CLUB_PATH,
        name: 'ClubMain',
        component: () => import('@/views/club/ClubMain.vue'),
        props: true,
    },
    {
        path: CLUB_CREATE_PATH,
        name: 'ClubCreate',
        component: () => import('@/views/club/ClubCreate.vue'),
    },
    {
        path: CLUB_PATH,
        name: 'ClubMain',
        component: () => import('@/views/club/ClubMain.vue'),
        props: true,
    },
    {
        path: CLUB_BOARD_CREATE_PATH,
        name: 'ClubBoardCreate',
        component: () => import('@/views/club/ClubBoardCreate.vue'),
    },
    {
        path: CLUB_BOARD_POST_PATH,
        name: 'ClubBoardPost',
        component: () => import('@/views/club/ClubBoardPost.vue'),
    },
];

export default routes;
