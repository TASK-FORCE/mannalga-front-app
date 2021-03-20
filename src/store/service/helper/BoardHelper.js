import RequestConverter from '@/apis/converter/RequestConverter.ts';
import boardApi from '@/apis/BoardApi.ts';

class BoardHelper {
    static async requestBoardList(clubSeq, pageDto, category) {
        const requestDto = {
            clubSeq,
            pageRequest: {
                ...(RequestConverter.convertPage(pageDto)),
                category,
            },
        };
        return boardApi.getClubBoardList(requestDto);
    }
}

export default BoardHelper;
