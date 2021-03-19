import RequestConverter from '@/apis/converter/RequestConverter.ts';
import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';

class CommentHelper {
    static async requestAllCommentListWithPaging(requestInfo, getPageDto, callbackForLastPage, callbackForRecursive) {
        // 마지막 페이지면 현재 페이지를 조회하여 refresh해준다.
        const pageDto = getPageDto();
        if (pageDto.isLastPage) {
            const requestDto = {
                ...requestInfo,
                requestParams: {
                    size: pageDto.size,
                    page: pageDto.currentPage,
                },
            };
            await callbackForLastPage(requestDto);
        }
        return actionsNormalTemplate(async () => requestCommentListRecursive(requestInfo, getPageDto, callbackForRecursive));
    }
}

const requestCommentListRecursive = async (requestInfo, getPageDto, callbackForRecursive) => {
    const pageDto = getPageDto();
    if (pageDto.isLastPage) return;
    const requestDto = {
        ...requestInfo,
        requestParams: RequestConverter.convertPage(pageDto),
    };
    await callbackForRecursive(requestDto);
    requestCommentListRecursive(requestInfo, getPageDto, callbackForRecursive);
};

export default CommentHelper;
