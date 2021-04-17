import store from '@/store';
import { getChildRoutePath, PATH } from '@/router/route_path_type.ts';
import { NavigationGuardNext, Route, RouteConfig } from 'vue-router/types/router';

function validationAuthentication(
  to: Route,
  from: Route,
  next: NavigationGuardNext
) {
  if (store.getters.hasToken) {
    next();
  } else {
    next(`${PATH.LOGIN}?validationFail=true`);
  }
}

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: PATH.LOGIN,
  },
  {
    path: PATH.LOGIN,
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue'),
  },
  // {
  //   path: PATH.BACKDOOR_LOGIN,
  //   name: 'BackdoorLogin',
  //   component: () => import('@/views/login/BackdoorLoginPage.vue'),
  // },
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
    beforeEnter: validationAuthentication,
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
    component: () => import('@/views/clubBoardCreateAndEdit/ClubBoardCreatePage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.BOARD_EDIT,
    name: 'ClubBoardEdit',
    component: () => import('@/views/clubBoardCreateAndEdit/ClubBoardEditPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.BOARD_POST,
    name: 'ClubBoardPost',
    component: () => import('@/views/clubBoardPost/ClubBoardPostPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.MEETING_CREATE,
    name: 'ClubMeetingCreate',
    component: () => import('@/views/clubMeetingCreateAndEdit/ClubMeetingCreatePage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.MEETING_EDIT,
    name: 'ClubMeetingEdit',
    component: () => import('@/views/clubMeetingCreateAndEdit/ClubMeetingEditPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.MEETING_POST,
    name: 'ClubMeetingPost',
    component: () => import('@/views/clubMeetingDetail/ClubMeetingDetailPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.ALBUM_CREATE,
    name: 'ClubAlbumCreate',
    component: () => import('@/views/clubAlbumCreateAndEdit/ClubAlbumCreatePage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.ALBUM_EDIT,
    name: 'ClubAlbumEdit',
    component: () => import('@/views/clubAlbumCreateAndEdit/ClubAlbumEditPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.CLUB.ALBUM_POST,
    name: 'ClubAlbumPost',
    component: () => import('@/views/clubAlbumPost/ClubAlbumPostPage.vue'),
    beforeEnter: validationAuthentication,
  },

  // user
  {
    path: PATH.USER.SETTINGS,
    name: 'UserSettings',
    component: () => import('@/views/userSetting/UserSettingPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.USER.REGION_EDIT,
    name: 'UserRegionEdit',
    component: () => import('@/views/userRegionEdit/UserRegionEditPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.USER.INTEREST_EDIT,
    name: 'UserInterestEdit',
    component: () => import('@/views/userInterestEdit/UserInterestEditPage.vue'),
    beforeEnter: validationAuthentication,
  },
  {
    path: PATH.NOT_SUPPORTED_BROWSER,
    name: 'NotSupportedBrowserPage',
    component: () => import('@/views/error/NotSupportedBrowserPage.vue'),
  },
  {
    path: '*',
    redirect: PATH.LOGIN,
  },
];

export default routes;
