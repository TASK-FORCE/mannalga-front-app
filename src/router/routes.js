import gettersHelper from '@/store/helper/GettersHelper.js';
import { getChildRoutePath, PATH } from '@/router/route_path_type.js';

function validationAuthentication(to, from, next) {
    if (gettersHelper.isAuth()) {
        next();
    } else {
        next(`${PATH.LOGIN}?validationFail=true`);
    }
}

const routes = [
    {
        path: '/',
        redirect: PATH.LOGIN,
    },
    {
        path: PATH.LOGIN,
        name: 'Login',
        component: () => import('@/views/LoginPage.vue'),
    },
    {
        path: PATH.REGISTER.MAIN,
        name: 'Register',
        component: () => import('@/views/register/RegisterMainPage.vue'),
        beforeEnter: validationAuthentication,
        children: [
            {
                path: getChildRoutePath(PATH.REGISTER.PROFILE),
                component: () => import('@/views/register/inner/RegisterProfileNestedPage.vue'),
                meta: { isFirstPage: true },
            },
            {
                path: getChildRoutePath(PATH.REGISTER.REGION),
                component: () => import('@/views/register/inner/RegisterRegionNestedPage.vue'),
            },
            {
                path: getChildRoutePath(PATH.REGISTER.INTEREST),
                component: () => import('@/views/register/inner/RegisterInterestNestedPage.vue'),
                meta: { isLastPage: true },
            },
        ],
    },
    {
        path: PATH.SELECT_REGION,
        name: 'SelectRegion',
        component: () => import('@/views/SelectRegionPage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: PATH.APP_MAIN,
        name: 'AppMain',
        component: () => import('@/views/ClubListMainPage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: PATH.CLUB.MAIN,
        name: 'ClubMain',
        component: () => import('@/views/club/ClubMainPage.vue'),
    },
    {
        path: PATH.CLUB.CREATE,
        name: 'ClubCreate',
        component: () => import('@/views/club/ClubCreatePage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: PATH.CLUB.BOARD_CREATE,
        name: 'ClubBoardCreate',
        component: () => import('@/views/club/clubBoard/ClubBoardCreatePage.vue'),
    },
    {
        path: PATH.CLUB.BOARD_POST,
        name: 'ClubBoardPost',
        component: () => import('@/views/club/clubBoard/ClubBoardPostPage.vue'),
    },
    {
        path: PATH.USER.SETTINGS,
        name: 'UserSettings',
        component: () => import('@/views/user/UserSettingListPage.vue'),
    },
    {
        path: PATH.USER.REGION_EDIT,
        name: 'UserRegionEdit',
        component: () => import('@/views/user/UserRegionEditPage.vue'),
    },
    {
        path: PATH.USER.INTEREST_EDIT,
        name: 'UserInterestEdit',
        component: () => import('@/views/user/UserInterestEditPage.vue'),
    },
];

export default routes;
