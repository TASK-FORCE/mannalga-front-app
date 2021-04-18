export enum MESSAGE {
  LOGIN_FAIL = '로그인에 실패했습니다. 다시 한번 더 시도해주세요.',
  LOGIN_REQUIRE = '로그인이 필요합니다.',
  TOKEN_EXPIRED = '토큰이 만료되었습니다.',
  SERVER_INSTABILITY = '서버가 불안정합니다. 다시 시도해주세요.',
  SELECT_REGION_REQUIRE = '지역을 선택해주세요.',
  SELECT_IMAGE_REQUIRE = '사진을 선택해주세요.',
  SUCCESS_IMAGE_REGISTER = '사진첩 등록 완료!',
  SUCCESS_REGISTER = '회원가입 완료!',
  SUCCESS_CLUB_CREATE = '모임생성 완료!',
  SUCCESS_CHANGE_REGIONS = '지역 변경 완료!',
  SUCCESS_CANCLE_MEETING_APPLICATION = '만남 참여가 취소되었습니다.',
  SUCCESS_JOIN_CLUB = '모임 가입 성공',
  SUCCESS_DELETE_CLUB = '모임이 삭제되었습니다.',
  SUCCESS_DELETE_BOARD = '게시판이 삭제되었습니다.',
  SUCCESS_DELETE_ALBUM = '사진첩이 삭제되었습니다.',
  SUCCESS_DELETE_MEETING = '만남이 삭제되었습니다.',
  EMPTY_COMMENT_TEXT = '댓글을 남겨보세요.',
  WITHDRAW_CLUB = '모임에 탈퇴되었습니다.',
  WITHDRAW_APP = '탈퇴되었습니다.',
  CLUB_MAIN_IMAGE_ADD_TEXT = '모임 대표 사진을 추가해보세요!',
  SELECT_INTEREST_OVER_COUNT = '관심사는 최대 {0}개까지 선택할 수 있습니다.',
}

export function format(str: string, ...args: any[]): string {
  return str.replace(/\{(\d+)\}/g, (match, index) => args[index])
}
