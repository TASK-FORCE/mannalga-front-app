import gettersHelper from '@/store/helper/GettersHelper.js';
import { getChildRoutePath, PATH } from '@/router/route_path_type.js';

function validationAuthentication(to, from, next) {
    if (gettersHelper.hasToken()) {
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
        component: () => import('@/views/login/LoginPage.vue'),
    },
    {
        path: PATH.BACKDOOR_LOGIN,
        name: 'BackdoorLogin',
        component: () => import('@/views/login/BackdoorLoginPage.vue'),
    },
    {
        path: PATH.REGISTER.MAIN,
        name: 'Register',
        component: () => import('@/views/register/RegisterRootPage.vue'),
        beforeEnter: validationAuthentication,
        children: [
            {
                path: getChildRoutePath(PATH.REGISTER.PROFILE),
                component: () => import('@/views/register/RegisterProfileNestedPage.vue'),
                meta: { isFirstPage: true },
            },
            {
                path: getChildRoutePath(PATH.REGISTER.REGION),
                component: () => import('@/views/register/RegisterRegionNestedPage.vue'),
            },
            {
                path: getChildRoutePath(PATH.REGISTER.INTEREST),
                component: () => import('@/views/register/RegisterInterestNestedPage.vue'),
                meta: { isLastPage: true },
            },
        ],
    },

    // club
    {
        path: PATH.CLUB_LIST,
        name: 'ClubList',
        component: () => import('@/views/clubList/ClubListPage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: PATH.CLUB.MAIN,
        name: 'ClubMain',
        component: () => import('@/views/clubDetail/ClubDetailPage.vue'),
    },
    {
        path: PATH.CLUB.CREATE,
        name: 'ClubCreate',
        component: () => import('@/views/clubCreateAndEdit/ClubCreatePage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: PATH.CLUB.EDIT,
        name: 'ClubEdit',
        component: () => import('@/views/clubCreateAndEdit/ClubEditPage.vue'),
        beforeEnter: validationAuthentication,
    },
    {
        path: PATH.CLUB.BOARD_CREATE,
        name: 'ClubBoardCreate',
        component: () => import('@/views/clubBoardCreate/ClubBoardCreatePage.vue'),
    },
    {
        path: PATH.CLUB.BOARD_POST,
        name: 'ClubBoardPost',
        component: () => import('@/views/clubBoardPost/ClubBoardPostPage.vue'),
    },
    {
        path: PATH.CLUB.MEETING_CREATE,
        name: 'ClubMeetingCreate',
        component: () => import('@/views/clubMeetingCreateAndEdit/ClubMeetingCreatePage.vue'),
    },
    {
        path: PATH.CLUB.MEETING_EDIT,
        name: 'ClubMeetingEdit',
        component: () => import('@/views/clubMeetingCreateAndEdit/ClubMeetingEditPage.vue'),
    },
    {
        path: PATH.CLUB.MEETING_POST,
        name: 'ClubMeetingPost',
        component: () => import('@/views/clubMeetingPost/ClubMeetingPostPage.vue'),
    },
    {
        path: PATH.CLUB.ALBUM_POST,
        name: 'ClubAlbumPost',
        component: () => import('@/views/clubAlbumPost/ClubAlbumPostPage.vue'),
        meta: { disableScrollBehavior: true },
    },
    {
        path: PATH.CLUB.SEARCH,
        name: 'ClubSearch',
        component: () => import('@/views/clubSearch/ClubSearchPage.vue'),
    },

    // user
    {
        path: PATH.USER.SETTINGS,
        name: 'UserSettings',
        component: () => import('@/views/userSetting/UserSettingPage.vue'),
    },
    {
        path: PATH.USER.REGION_EDIT,
        name: 'UserRegionEdit',
        component: () => import('@/views/userRegionEdit/UserRegionEditPage.vue'),
    },
    {
        path: PATH.USER.INTEREST_EDIT,
        name: 'UserInterestEdit',
        component: () => import('@/views/userInterestEdit/UserInterestEditPage.vue'),
    },
    {
        path: '*',
        redirect: PATH.CLUB_LIST,
    },
];

export default routes;
