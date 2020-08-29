const MESSAGE = {
    LOGIN_FAIL: '로그인에 실패했습니다. 다시 한번 더 시도해주세요.',
    LOGIN_REQUIRE: '로그인이 필요합니다.',
    SERVER_INSTABILITY: '서버가 불안정합니다. 다시 시도해주세요.',
    SELECT_LOCATION_REQUIRE: '모임에 참여할 지역은 최소 1개 이상 선택해주세요.',
    SUCCESS_REGISTER: '회원가입 완료!',
    SELECT_INTEREST_OVER_COUNT: '관심사는 최대 5개까지 선택할 수 있습니다.',
};

const COLOR = {
    NOT_SELECTED: 'black',
    SELECTED: 'green',
};

const NAME_RULES = [
    v => !!v || '이름을 작성해주세요.',
    v => !/\s/.test(v) || '공백을 제거해주세요!',
];

export { MESSAGE, COLOR, NAME_RULES };
