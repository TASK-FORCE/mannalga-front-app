import { createClubMaximumNumberList } from '@/utils/common/constant/constantUtils.js';

const MESSAGE = {
    LOGIN_FAIL: '로그인에 실패했습니다. 다시 한번 더 시도해주세요.',
    LOGIN_REQUIRE: '로그인이 필요합니다.',
    SERVER_INSTABILITY: '서버가 불안정합니다. 다시 시도해주세요.',
    SELECT_REGION_REQUIRE: '모임에 참여할 지역은 최소 1개 이상 선택해주세요.',
    SUCCESS_REGISTER: '회원가입 완료!',
    SUCCESS_CLUB_CREATE: '모임생성 완료!',
    SUCCESS_CHANGE_REGIONS: '지역 변경 완료!',
    SUCCESS_CHANGE_INTERESTS: '관심사 변경 완료!',
    SELECT_INTEREST_OVER_COUNT: '관심사는 최대 5개까지 선택할 수 있습니다.',
    FAIL_CLUB_CREATE: '모임 생성에 실패했습니다.',
};

const COLOR = {
    NOT_SELECTED: '',
    SELECTED: 'green',
};

const RULES = {
    PROFILE_NAME: [
        v => !!v || '이름을 작성해주세요.',
        v => !/\s/.test(v) || '공백을 제거해주세요!',
    ],
    CLUB_TITLE: [v => !!v || '모임명을 작성해주세요.'],
    CLUB_INTEREST: [v => !!v || '모임 관심사를 선택해주세요.'],
    CLUB_REGION: [v => !!v || '모임 지역을 선택해주세요.'],
    CLUB_DESCRIPTION: [v => !!v || '모임 설명을 작성해주세요.'],
    CLUB_MAXIMUM_NUMBER: [v => !!v || '모임 최대인원을 작성해주세요.'],
};

const CLUB_MAXIMUM_NUMBER_LIST = createClubMaximumNumberList(10, 100, 10);

export { MESSAGE, COLOR, CLUB_MAXIMUM_NUMBER_LIST, RULES };
