<template>
  <div>
    <ClubBoardCreateAndEdit
      headerTitle="게시글 수정"
      :submitClickCallback="submit"
      @back="$router.push(boardPostPagePath())"
    />
  </div>
</template>

<script lang="ts">

import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import Vue from 'vue';
import routerHelper from '@/router/RouterHelper';
import ClubBoardCreateAndEdit from '@/views/clubBoardCreateAndEdit/ClubBoardCreateAndEdit.vue';
import { Board, BoardWriteContext, BoardWriteRequest, BoardWriteRequestWishSeq } from '@/interfaces/board/board';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubBoardEditPage',
  components: { ClubBoardCreateAndEdit },
  mixins: [mixin],
  computed: {
    board(): Board {
      return this.$store.state.board.board;
    },
    editContext(): BoardWriteContext {
      if (this.board.boardSeq === 0) {
        this.$router.back();
      }
      return {
        title: this.board.title,
        content: this.board.content,
        category: this.board.category,
        imgList: [], // TODO check
      };
    },
  },
  methods: {
    boardPostPagePath() {
      return generateParamPath(PATH.CLUB.BOARD_POST, [routerHelper.clubSeq(), routerHelper.boardSeq()]);
    },
    submit(boardWriteRequest: BoardWriteRequest) {
      const boardWriteRequestWishSeq: BoardWriteRequestWishSeq = {
        clubSeq: routerHelper.clubSeq(),
        boardSeq: routerHelper.boardSeq(),
        boardWriteRequest: boardWriteRequest,
      }
      return this.$store.dispatch(BoardActionTypes.REQUEST_CLUB_BOARD_EDIT, boardWriteRequestWishSeq)
        .then(() => {
          this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, { clubSeq: routerHelper.clubSeq() });
          this.$router.push(this.boardPostPagePath());
        })
    },
  }
})
;
</script>

<style scoped>
</style>
