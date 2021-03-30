import RequestConverter from '@/apis/converter/RequestConverter.ts';
import boardApi from '@/apis/BoardApi.ts';
import { BoardListRequest, BoardListResponse, BoardPageRequest } from '@/interfaces/board/board';
import { Page } from '@/interfaces/common';

class BoardHelper {
  static async requestBoardList(
    { clubSeq, category, text }: BoardListRequest,
    page: Page,
  ): Promise<BoardListResponse> {
    const boardPageRequest: BoardPageRequest = {
      clubSeq,
      category,
      title: text,
      pageRequest: RequestConverter.convertPage(page),
    };
    return boardApi.getClubBoardList(boardPageRequest);
  }
}

export default BoardHelper;
