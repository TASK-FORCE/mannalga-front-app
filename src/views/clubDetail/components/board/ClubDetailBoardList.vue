<template>
  <div class="h-100">
    <div class="search-wrapper">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div
            class="category-btn"
            v-bind="attrs"
            v-on="on"
          >
            <div>{{ selectedCategory }}</div>
            <div class="d-flex align-center ml-1">
              <v-icon
                color="#9f9f9f"
                size="20"
                v-text="'$menuDown'"
              />
            </div>
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(category, index) in boardCategoryNames"
            :key="index"
            @click="selectedCategory = category"
          >
            <v-list-item-title>{{ category }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
    <InfiniteScrollTemplate
      v-if="!loading"
      name="board"
      :firstPageCallback="this.fetchFirstPage"
      :nextPageCallback="this.fetchNextPage"
      :pageElements="boardList"
      :pageInfo="boardPage"
      withListGroup
    >
      <template v-slot:list-main>
        <div
          v-for="board in boardList"
          :key="board.seq"
        >
          <ClubDetailBoardPost :board="board" />
        </div>
      </template>
      <template #empty>
        <EmptyPage
          icon="note"
          title="게시글이 없습니다."
          description="글을 작성하여 모임원들과 이야기하세요."
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
    <FixedCreateBtn
      v-if="canCreateBoard"
      color="blue"
      :path="getClubBoardCreatePath()"
      left
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import ClubDetailBoardPost from '@/views/clubDetail/components/board/ClubDetailBoardPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import { CurrentUserInfo } from '@/interfaces/club';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { BoardCategory } from '@/interfaces/board/BoardCategory';
import { BoardFeed, BoardListRequest } from '@/interfaces/board/board';
import { Page } from '@/interfaces/common';
import _ from '@/utils/common/lodashWrapper';

export default Vue.extend({
  name: 'ClubDetailBoardList',
  components: {
    EmptyPage,
    InfiniteScrollTemplate,
    ClubDetailBoardPost,
    FixedCreateBtn,
  },
  props: {
    currentUserInfo: Object as PropType<CurrentUserInfo>,
  },
  data() {
    return {
      boardCategoryNames: ['전체보기', ...BoardCategory.getCategoryNames()] as string[],
      selectedCategory: '전체보기' as string,
      searchText: undefined as undefined | string,
      searchDebounce: (() => ({})) as () => void,
      loading: false as boolean,
    };
  },
  computed: {
    clubSeq(): number {
      return routerHelper.clubSeq();
    },
    boardList(): BoardFeed[] {
      return this.$store.state.board.boardList;
    },
    boardPage(): Page {
      return this.$store.state.board.boardPage;
    },
    canCreateBoard(): boolean {
      const { isMaster, isManager, isMember } = this.currentUserInfo;
      return isMaster || isManager || isMember;
    },
    requestDto(): BoardListRequest {
      return {
        clubSeq: this.clubSeq,
        category: BoardCategory.findCategoryTypeByName(this.selectedCategory),
        text: this.searchText,
      };
    },
  },
  watch: {
    selectedCategory(value) {
      this.search();
    },
    searchText(value) {
      if (_.isEmpty(value)) {
        return;
      }
      this.loading = true;
      this.searchDebounce();
    },
  },
  mounted() {
    this.searchDebounce = _.debounce(() => this.search().finally(() => (this.loading = false)), 500);
  },
  methods: {
    fetchFirstPage(): Promise<void> {
      return this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, this.requestDto);
    },
    fetchNextPage(): Promise<void> {
      return this.$store.dispatch(BoardActionTypes.REQUEST_NEXT_BOARD_LIST, this.requestDto);
    },
    getClubBoardCreatePath(): string {
      return generateParamPath(PATH.CLUB.BOARD_CREATE, [this.clubSeq]);
    },
    search(): Promise<void> {
      return this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, this.requestDto);
    },
    resolveHeight(): any {
      let height = window.innerHeight;
      const searchWrapper = document.querySelector('.search-wrapper') as HTMLElement;
      if (searchWrapper) {
        height -= searchWrapper.getBoundingClientRect().bottom;
      }
      return height;
    },
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

  .category-btn {
    display: flex;
    background-color: #FFFFFF;
    border-radius: 30px;
    padding: 2px 10px 2px 14px;
    font-size: 13px;
    color: #9f9f9f;
    width: 140px;
    height: 25px;
  }

  .search-text-bar {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 30px;
    font-size: 13px;
    color: #9f9f9f;
    margin-left: 20px;
    margin-top: 0 !important;
    width: 100%;
    padding: 0 10px;
    height: 25px !important;


    .v-input__prepend-outer {
      margin: 0 !important;
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
}
</style>
