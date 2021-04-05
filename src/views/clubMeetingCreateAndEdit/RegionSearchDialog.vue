<template>
  <v-dialog
    :value="value"
    persistent
    fullscreen
  >
    <v-card>
      <CommonHeader
        title="위치 정보 검색"
        isDialog
        @back="close"
      />
      <div class="search-wrapper">
        <v-text-field
          v-model="searchText"
          class="search-text-bar"
          dense
          hide-details
          rounded
          placeholder="검색어를 입력하세요."
          prepend-icon="$search"
        />
      </div>
      <div v-if="barrier">
        <InfiniteScrollTemplate
          v-if="!loading"
          name="board"
          :firstPageCallback="this.fetchFirstPage"
          :nextPageCallback="this.fetchNextPage"
          :pageElements="searchDocuments"
          :pageInfo="page"
          :callFirstPage="false"
          withListGroup
        >
          <template v-slot:list-main>
            <div
              v-for="document in searchDocuments"
              :key="document.id"
              @click="openDialog(document)"
            >
              <div class="region">
                <div class="region-info-wrapper">
                  <div>
                    이름: {{ document.place_name }}
                  </div>
                  <div class="mt-2">
                    주소: {{ document.address_name }}
                  </div>
                </div>
              </div>
              <MiddleDivider :height="5" />
            </div>
          </template>
          <template #empty>
            <EmptyPage
              icon="mapMarker"
              title="검색 결과가 없습니다."
              description="다른 검색어를 입력해주세요."
            />
          </template>
        </InfiniteScrollTemplate>
        <div
          v-else
          class="d-flex justify-center align-center"
          :style="`height: ${resolveHeight()}px`"
        >
          <v-progress-circular
            indeterminate
            color="red"
            :size="50"
          />
        </div>
      </div>
    </v-card>
    <YesOrNoDialog
      v-model="openSelectDialog"
      title="해당 지역을 선택하시겠습니까?"
      optionBtnText="열기"
      submitText="선택"
      :submitPromiseCallback="select"
      @clickOptionBtn="openUrl"
    >
      <template #description>
        <div class="mb-2">
          <div>
            이름: {{ selectedDocument.place_name }}
          </div>
          <div>
            주소: {{ selectedDocument.address_name }}
          </div>
        </div>
      </template>
    </YesOrNoDialog>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import CommonHeader from '@/components/header/CommonHeader.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import { Page } from '@/interfaces/common';
import { kakaoMapHelper, KakaoMapSearchDocs, KakaoMapSearchResponse } from '@/utils/kakao/map/search';
import _ from '@/utils/common/lodashWrapper';
import MiddleDivider from '@/components/MiddleDivider.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';

const FIRST_PAGE_FOR_KAKAO_MAP: Page = {
  currentPage: 0,
  nextPage: 1,
  size: 15,
  isLastPage: false,
}

const LAST_PAGE: Page = {
  currentPage: 0,
  nextPage: 0,
  size: 0,
  isLastPage: true,
}

export default Vue.extend({
  name: 'RegionSearchDialog',
  components: { YesOrNoDialog, MiddleDivider, EmptyPage, InfiniteScrollTemplate, CommonHeader },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      barrier: false,
      searchText: '' as string,
      page: LAST_PAGE as Page,
      searchDocuments: [] as KakaoMapSearchDocs[],
      searchDebounce: (() => ({})) as () => void,
      openSelectDialog: false,
      selectedDocument: {
        id: '',
        place_name: '',
        place_url: '',
        address_name: '',
        road_address_name: '',
      } as KakaoMapSearchDocs,
    };
  },
  watch: {
    searchText(value) {
      if (_.isEmpty(value)) {
        return;
      }
      this.open();
      this.loading = true;
      this.searchDebounce();
    },
  },
  mounted() {
    this.searchDebounce = _.debounce(() => this.fetchFirstPage().finally(() => (this.loading = false)), 1000);
  },
  methods: {
    open() {
      if (!this.barrier) {
        this.barrier = true;
      }
    },
    openDialog(document: KakaoMapSearchDocs) {
      this.selectedDocument = document;
      this.openSelectDialog = true;
    },
    fetchFirstPage(): Promise<void> {
      if (_.isEmpty(this.searchText)) {
        this.setEmpty();
        return Promise.resolve();
      }
      return kakaoMapHelper.search(this.searchText, FIRST_PAGE_FOR_KAKAO_MAP)
        .then((response: KakaoMapSearchResponse) => {
          this.searchDocuments = response.searchDocuments;
          this.page = response.page;
        });
    },
    setEmpty() {
      this.searchDocuments = [];
      this.page = LAST_PAGE;
    },
    fetchNextPage(): Promise<void> {
      if (_.isEmpty(this.searchText)) {
        this.setEmpty();
        return Promise.resolve();
      }
      return kakaoMapHelper.search(this.searchText, this.page)
        .then((response: KakaoMapSearchResponse) => {
          this.searchDocuments = this.searchDocuments.concat(response.searchDocuments);
          this.page = response.page;
        })
    },
    close() {
      this.$emit('input', false);
    },
    resolveHeight(): any {
      let height = window.innerHeight;
      const searchWrapper = document.querySelector('.search-wrapper') as HTMLElement;
      if (searchWrapper) {
        height -= searchWrapper.getBoundingClientRect().bottom;
      }
      return height;
    },
    async select() {
      if (this.selectedDocument) {
        this.$emit('select', this.selectedDocument);
        this.close();
      }
    },
    openUrl() {
      if (this.selectedDocument) {
        window.open(this.selectedDocument.place_url);
      }
    }
  },
});
</script>

<style
  scoped
  lang="scss"
>
.search-wrapper {
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  height: 64px;
  padding: 0 20px;

  .search-text-bar {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 30px;
    font-size: 13px;
    color: #9f9f9f;
    margin-top: 0 !important;
    width: 100%;
    padding: 0 10px;
    height: 35px !important;


    .v-input__prepend-outer {
      margin: 0 !important;
    }
  }
}

.region {
  display: flex;
  padding: 10px 20px;
  font-size: 15px;
  align-items: center;
  color: #292929;

  .region-info-wrapper {
    width: 100%;
  }

  .region-btn-wrapper {
    width: 80px;
    text-align: center;

    .btn {
      font-weight: bold;
      font-size: 13px;
      color: #FFFFFF;
    }
  }
}

.theme--dark {
  .search-wrapper {
    background-color: #292929;

    .category-btn, .search-text-bar {
      background-color: #121212;
    }
  }

  .region {
    color: #F5F5F5;
  }
}
</style>
