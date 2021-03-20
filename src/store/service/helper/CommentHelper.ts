import RequestConverter from '@/apis/converter/RequestConverter.ts';
import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import { Page } from '@/interfaces/common';

class CommentHelper {
    static async requestAllCommentListWithPaging(
        requestInfo,
        getPage: () => Page,
        callbackForLastPage,
        callbackForRecursive,
    ) {
        // 마지막 페이지면 현재 페이지를 조회하여 refresh해준다.
        const page: Page = getPage();
        if (page.isLastPage) {
            const requestDto = {
                ...requestInfo,
                pageRequest: {
                    size: page.size,
                    page: page.currentPage,
                },
            };
            await callbackForLastPage(requestDto);
        }
        return actionsNormalTemplate(async () => requestCommentListRecursive(requestInfo, getPage, callbackForRecursive));
    }

    static async requestAllCommentListWithPaging2<T>(
        pageRequestBuilder: (page: Page) => T,
        getPage: () => Page,
        requestPageForLastPage: (pageRequest: T) => Promise<any>,
        requestPageForRecursive: (pageRequest: T) => Promise<any>,
    ) {
        // 마지막 페이지면 현재 페이지만 조회
        const page: Page = getPage();
        if (page.isLastPage) {
            await requestPageForLastPage(pageRequestBuilder(page));
        }
        return actionsNormalTemplate(async () => requestCommentListWithRecursive2<T>(pageRequestBuilder, getPage, requestPageForRecursive));
    }
}

const requestCommentListRecursive = async (
    requestInfo,
    getPageDto,
    callbackForRecursive) => {
    const pageDto = getPageDto();
    if (pageDto.isLastPage) return;
    const requestDto = {
        ...requestInfo,
        pageRequest: RequestConverter.convertPage(pageDto),
    };
    await callbackForRecursive(requestDto);
    requestCommentListRecursive(requestInfo, getPageDto, callbackForRecursive);
};

async function requestCommentListWithRecursive2<T>(
    pageRequestBuilder: (page: Page) => T,
    getPage: () => Page,
    requestPageForRecursive: (pageRequest: T) => Promise<any>,
) {
    const page: Page = getPage();
    if (page.isLastPage) return;
    await requestPageForRecursive(pageRequestBuilder(page));
    requestCommentListRecursive(pageRequestBuilder, getPage, requestPageForRecursive);
}

export default CommentHelper;
