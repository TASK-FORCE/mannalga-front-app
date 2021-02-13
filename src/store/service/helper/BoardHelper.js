import RequestConverter from '@/store/converter/RequestConverter.js';
import boardApi from '@/apis/BoardApi.js';

class BoardHelper {
    static async requestBoardList(clubSeq, pageDto, category) {
        const requestDto = {
            clubSeq,
            requestParams: {
                ...(RequestConverter.convertPage(pageDto)),
                category,
            },
        };
        return boardApi.getClubBoardList(requestDto);
    }
}

export default BoardHelper;
