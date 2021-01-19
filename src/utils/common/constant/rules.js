import _ from '@/utils/common/lodashWrapper.js';
import { isNumeric } from '@/utils/common/commonUtils.js';

const RULES = {
    EMPTY_RULE: [v => !!v],
    PROFILE_NAME: [
        v => !!v || '이름을 작성해주세요.',
        v => !/\s/.test(v) || '공백을 제거해주세요!',
    ],
    CLUB_TITLE: [v => !!v || '모임명을 작성해주세요.'],
    CLUB_INTEREST: [v => !!v || '모임 관심사를 선택해주세요.'],
    CLUB_REGION: [v => !!v || '모임 지역을 선택해주세요.'],
    CLUB_DESCRIPTION: [v => !!v || '모임 설명을 작성해주세요.'],
    CLUB_MAXIMUM_NUMBER: [v => !!v || '모임 최대인원을 작성해주세요.'],
    CLUB_BOARD_TITLE: [v => !!v || '게시글 제목을 작성해주세요.'],
    CLUB_BOARD_CONTENT: [v => !!v || '게시글 내용을 작성해주세요.'],
    CLUB_BOARD_CATEGORY: [v => !!v || '게시글 카테고리를 선택해주세요.'],
    CLUB_MEETING_TITLE: [v => !!v || '만남 제목을 작성해주세요.'],
    CLUB_MEETING_MAXIMUM_NUMBER: [v => {
        if (_.isEmpty(v)) return true;
        if (!isNumeric(v)) {
            return '숫자를 입력해주세요.';
        }
        const number = parseInt(v, 10);
        if (number < 2) {
            return '만남 최대 인원은 2명 이상으로 입력해주세요.';
        }
        if (number > 999) {
            return '만남 최대 인원은 999명 이하로 입력해주세요.';
        }
        return true;
    }],
    CLUB_ALBUM_TITLE: [v => !!v || '사진 제목을 작성해주세요.'],
    COST: [v => {
        if (_.isEmpty(v)) return true;
        const number = v.replaceAll(',', '');
        if (!isNumeric(number)) {
            return '숫자를 입력해주세요.';
        }
        return true;
    }],
    DATE: [v => !!v || '날짜을 지정해주세요.'],
    TIME: [v => !!v || '시간를 지정해주세요.'],
    COMMENT: [v => !!v || '댓글을 작성해주세요.'],
};

export { RULES };
