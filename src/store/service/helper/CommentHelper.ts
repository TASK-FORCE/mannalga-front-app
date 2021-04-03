import { actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import { Page } from '@/interfaces/common';

class CommentHelper {
  static async requestAllCommentListWithPaging<T>(
    pageRequestBuilder: (page: Page) => T,
    getPage: () => Page,
    requestPageForLastPage: (pageRequest: T) => Promise<any>,
    requestPageForRecursive: (pageRequest: T) => Promise<any>,
  ) {
    // 마지막 페이지면 현재 페이지만 조회
    const page: Page = getPage();
    if (page.isLastPage) {
      const pageForLastPage = {
        currentPage: page.currentPage - 1,
        nextPage: page.nextPage - 1,
        size: page.size,
        isLastPage: false,
      }
      await requestPageForLastPage(pageRequestBuilder(pageForLastPage));
    }
    return actionsNormalTemplate(async () => requestCommentListWithRecursive<T>(pageRequestBuilder, getPage, requestPageForRecursive));
  }
}

async function requestCommentListWithRecursive<T>(
  pageRequestBuilder: (page: Page) => T,
  getPage: () => Page,
  requestPageForRecursive: (pageRequest: T) => Promise<any>,
) {
  const page: Page = getPage();
  if (page.isLastPage) return;
  await requestPageForRecursive(pageRequestBuilder(page));
  requestCommentListWithRecursive<T>(pageRequestBuilder, getPage, requestPageForRecursive);
}

export default CommentHelper;
