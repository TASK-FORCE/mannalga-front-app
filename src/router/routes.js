import { CLUB_BOARD_CREATE_PATH, CLUB_BOARD_POST_PATH, CLUB_CREATE_PATH, CLUB_PATH, LOGIN_PATH, MAIN_PATH, REGISTER_PATH, SELECT_REGION_PATH, USER_SETTINGS_PATH } from '@/router/route_path_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';

function validationAuthentication(to, from, next) {
    if (gettersHelper.isAuth()) {
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
        component: () => import('@/views/LoginPage.vue'),
    },
    {
        path: REGISTER_PATH.ROOT,
        name: 'Register',
        component: () => import('@/views/register/RegisterMainPage.vue'),
        beforeEnter: validationAuthentication,
        children: [
            {
                path: REGISTER_PATH.PROFILE,
                component: () => import('@/views/register/inner/RegisterProfileNestedPage.vue'),
                meta: { isFirstPage: true },
            },
            {
                path: REGISTER_PATH.REGION,
                component: () => import('@/views/register/inner/RegisterRegionNestedPage.vue'),
            },
            {
                path: REGISTER_PATH.INTEREST,
                component: () => import('@/views/register/inner/RegisterInterestNestedPage.vue'),
                meta: { isLastPage: true },
            },
        ],
    },
    {
        path: SELECT_REGION_PATH,
        name: 'SelectRegion',
        component: () => import('@/views/SelectRegionPage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: MAIN_PATH,
        name: 'AppMain',
        component: () => import('@/views/AppMainPage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: CLUB_PATH,
        name: 'ClubMain',
        component: () => import('@/views/club/ClubMainPage.vue'),
        props: true,
    },
    {
        path: CLUB_CREATE_PATH,
        name: 'ClubCreate',
        component: () => import('@/views/club/ClubCreatePage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: CLUB_BOARD_CREATE_PATH,
        name: 'ClubBoardCreate',
        component: () => import('@/views/club/ClubBoardCreatePage.vue'),
    },
    {
        path: CLUB_BOARD_POST_PATH,
        name: 'ClubBoardPost',
        component: () => import('@/views/club/ClubBoardPostPage.vue'),
    },
    {
        path: USER_SETTINGS_PATH,
        name: 'UserSettings',
        component: () => import('@/views/UserSettingsPage.vue'),
    },
];

export default routes;
