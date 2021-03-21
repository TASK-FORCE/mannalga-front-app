import RequestConverter from '@/apis/converter/RequestConverter.ts';
import boardApi from '@/apis/BoardApi.ts';
import { BoardCategoryType, BoardListResponse, BoardPageRequest } from '@/interfaces/board/board';
import { Page } from '@/interfaces/common';

class BoardHelper {
  static async requestBoardList(
    clubSeq: number,
    category: BoardCategoryType,
    page: Page,
  ): Promise<BoardListResponse> {
    const boardPageRequest: BoardPageRequest = {
      clubSeq,
      category,
      pageRequest: RequestConverter.convertPage(page),
    };
    return boardApi.getClubBoardList(boardPageRequest);
  }
}

export default BoardHelper;
