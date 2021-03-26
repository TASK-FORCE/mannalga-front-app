import _ from '@/utils/common/lodashWrapper.ts';

export const PATH = {
  LOGIN: '/login',
  BACKDOOR_LOGIN: '/backdoor',
  CLUB_LIST: '/clubList',
  SELECT_REGION: '/select/region',
  REGISTER: {
    MAIN: '/register',
    PROFILE: '/register/profile',
    REGION: '/register/region',
    INTEREST: '/register/interest',
  },
  CLUB: {
    CREATE: '/create/club',
    EDIT: '/club/edit/:clubSeq',
    MAIN: '/club/:clubSeq',
    BOARD_CREATE: '/club/:clubSeq/create/board',
    BOARD_POST: '/club/:clubSeq/board/:boardSeq',
    MEETING_CREATE: '/club/:clubSeq/create/meeting',
    MEETING_EDIT: '/club/:clubSeq/meeting/edit/:meetingSeq',
    MEETING_POST: '/club/:clubSeq/meeting/:meetingSeq',
    ALBUM_POST: '/club/:clubSeq/album/:albumSeq',
    SEARCH: '/search/club',
  },
  USER: {
    SETTINGS: '/user/settings',
    REGION_EDIT: '/user/region/edit',
    INTEREST_EDIT: '/user/interest/edit',
  },
  BACK: 'back',
};

// route 계층 구조 이용시 child route path를 정의하기 위해 필요
export const getChildRoutePath = (path: string): string => {
  const split = path.split('/');
  return split[split.length - 1];
};

export const generateParamPath = (path: string, params: number[]): string => {
  if (_.isEmpty(path) || _.isEmpty(params)) {
    throw Error(`path or params must not be empty. path: ${path}, params: ${params}`);
  }
  let paramIndex = 0;
  return path
    .split('/')
    .map((token: string) => {
      if (token.startsWith(':')) {
        // eslint-disable-next-line no-plusplus
        return (params[paramIndex++]).toString()
      }
      return token;
    })
    .join('/');
};
