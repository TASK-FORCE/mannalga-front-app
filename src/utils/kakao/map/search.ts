import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Page } from '@/interfaces/common';
import ResponseConverter from '@/apis/converter/ResponseConverter';

const SEARCH_URL = 'http://dapi.kakao.com/v2/local/search/keyword.json';

class KakaoMapHelper {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Authorization': `KakaoAK ${process.env.VUE_APP_KAKAO_REST_APP_KEY}`
      }
    })
  }

  async search(keyword: string, page: Page): Promise<KakaoMapSearchResponse> {
    if (page.isLastPage) {
      throw new Error('cannot search when page is lastPage');
    }

    const serverResponse: KakaoMapSearchServerResponse = await this.doSearch(keyword, page).then(ResponseConverter.extractResponseData);

    return {
      searchDocuments: serverResponse.documents,
      page: this.toAppPage(serverResponse.meta, page)
    }
  }

  private doSearch(keyword: string, page: Page): Promise<AxiosResponse> {
    return this.axiosInstance.get(SEARCH_URL, {
      params: {
        query: keyword,
        size: page.size,
        page: page.nextPage,
      }
    });
  }

  private toAppPage(searchPage: KakaoMapSearchPage, previousPage: Page): Page {
    return {
      currentPage: previousPage.nextPage,
      nextPage: previousPage.nextPage + 1,
      size: previousPage.size,
      isLastPage: searchPage.is_end,
    }
  }

}

export const kakaoMapHelper = new KakaoMapHelper()

export interface KakaoMapSearchDocs {
  id: string;
  place_name: string;
  place_url: string;
  address_name: string;
  road_address_name: string;
}

interface KakaoMapSearchPage {
  is_end: boolean;
  pageable_count: number;
}

interface KakaoMapSearchServerResponse {
  documents: KakaoMapSearchDocs[];
  meta: KakaoMapSearchPage;
}

export interface KakaoMapSearchResponse {
  searchDocuments: KakaoMapSearchDocs[];
  page: Page;
}
