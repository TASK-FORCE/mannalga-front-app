<template>
  <div>
    <div class="ml-3 mt-1 mb-3">
      <v-select
        v-model="selectedCategory"
        :items="boardCategoryNames"
        outlined
        dense
        hide-details
        style="width: 120px"
      />
    </div>
    <InfiniteScrollTemplate
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
import { BoardCategoryType } from '@/interfaces/board/board';

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
    };
  },
  computed: {
    clubSeq: () => routerHelper.clubSeq(),
    boardList() {
      return this.$store.state.board.boardList;
    },
    boardPage() {
      return this.$store.state.board.boardPage;
    },
    canCreateBoard() {
      const { isMaster, isManager, isMember } = this.currentUserInfo;
      return isMaster || isManager || isMember;
    },
    categoryType(): BoardCategoryType {
      return BoardCategory.findCategoryTypeByName(this.selectedCategory);
    },
    requestDto() {
      return {
        clubSeq: this.clubSeq,
        category: this.categoryType,
      };
    },
  },
  watch: {
    selectedCategory(value) {
      this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, this.requestDto);
    },
  },
  methods: {
    fetchFirstPage() {
      return this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, this.requestDto);
    },
    fetchNextPage() {
      return this.$store.dispatch(BoardActionTypes.REQUEST_NEXT_BOARD_LIST, this.requestDto);
    },
    getClubBoardCreatePath() {
      return generateParamPath(PATH.CLUB.BOARD_CREATE, [this.clubSeq]);
    }

  },
});
</script>

<style
  scoped
  lang="scss"
>
</style>
