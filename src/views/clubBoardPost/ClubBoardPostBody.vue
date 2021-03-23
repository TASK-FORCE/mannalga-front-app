<template>
  <BoardTemplate
    :boardVo="boardVo"
    :boardTemplateContext="boardTemplateContext"
  >
    <template #content>
      <div class="pa-3">
        <div
          class="content"
          v-text="board.content"
        />
      </div>
    </template>
  </BoardTemplate>
</template>

<script lang="ts">
import routerHelper from '@/router/RouterHelper.ts';
import BoardTemplate from '@/components/BoardTemplate.vue';
import Vue from 'vue';
import { BoardMutationTypes } from '@/store/type/mutationTypes';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { Board, BoardCommentWriteRequest, BoardSeqContext, BoardSubCommentRequest } from '@/interfaces/board/board';
import { BoardTemplateContext, BoardVo } from '@/interfaces/common';

export default Vue.extend({
  name: 'ClubBoardPostBody',
  components: {
    BoardTemplate,
  },
  computed: {
    board(): Board {
      return this.$store.state.board.board;
    },
    seqContext(): BoardSeqContext {
      return {
        clubSeq: routerHelper.clubSeq(),
        boardSeq: routerHelper.boardSeq(),
      };
    },
    boardVo(): BoardVo {
      return {
        writerName: this.board.writer.name,
        writerSeq: this.board.writer.writerUserSeq,
        writerImage: this.board.writer.imgUrl,
        title: this.board.title,
        isLiked: this.board.isLiked,
        likeCnt: this.board.likeCnt,
      };
    },
    boardTemplateContext(): BoardTemplateContext {
      return {
        commentList: this.$store.state.board.boardCommentList,
        commentPage: this.$store.state.board.boardCommentPage,
        fetchFirstPage: this.fetchFirstPage,
        fetchNextPage: this.fetchNextPage,
        requestWriteComment: this.requestWriteComment,
        requestWriteSubComment: this.requestWriteSubComment,
        requestSubCommentList: this.requestSubCommentList,
        commentWritePostProcess: this.commentWritePostProcess,
        requestApplyLike: this.requestApplyLike,
        requestDeleteLike: this.requestDeleteLike,
      };
    },
  },
  created() {
    this.$store.dispatch(BoardActionTypes.REQUEST_BOARD, this.seqContext)
      .catch(() => this.$router.back());
  },
  beforeDestroy() {
    this.$store.commit(BoardMutationTypes.INIT_BOARD_COMMENT_LIST);
  },
  methods: {
    fetchFirstPage(): Promise<void> {
      return this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_COMMENT_LIST, this.seqContext);
    },
    fetchNextPage(): Promise<void> {
      return this.$store.dispatch(BoardActionTypes.REQUEST_NEXT_BOARD_COMMENT_LIST, this.seqContext);
    },
    requestWriteComment(content: string): Promise<void> {
      const boardCommentWriteRequest: BoardCommentWriteRequest = {
        boardSeqContext: this.seqContext,
        content
      };
      return this.$store.dispatch(BoardActionTypes.REQUEST_BOARD_COMMENT_WRITE, boardCommentWriteRequest)
        .then(() => this.$store.commit(BoardMutationTypes.COUNT_COMMENT_CNT_OF_BOARD, this.board.boardSeq));
    },
    requestWriteSubComment(content: string, parentCommentSeq: number): Promise<void> {
      const boardCommentWriteRequest: BoardCommentWriteRequest = {
        boardSeqContext: this.seqContext,
        parentCommentSeq,
        content
      };
      return this.$store.dispatch(BoardActionTypes.REQUEST_BOARD_COMMENT_WRITE, boardCommentWriteRequest)
        .then(() => {
          this.$store.commit(BoardMutationTypes.COUNT_COMMENT_CNT_OF_BOARD, this.board.seq);
          this.$store.commit(BoardMutationTypes.COUNT_COMMENT_CNT_OF_PARENT_COMMENT, parentCommentSeq);
        });
    },
    requestSubCommentList(parentCommentSeq: number): Promise<void> {
      const boardSubCommentRequest: BoardSubCommentRequest = {
        ...this.seqContext,
        parentCommentSeq,
      };
      return this.$store.dispatch(BoardActionTypes.REQUEST_ALL_BOARD_SUB_COMMENT_LIST, boardSubCommentRequest);
    },
    commentWritePostProcess() {
      return this.$store.dispatch(BoardActionTypes.REQUEST_ALL_BOARD_COMMENT_LIST_WITH_PAGING, this.seqContext);
    },
    requestApplyLike() {
      return this.$store.dispatch(BoardActionTypes.REQUEST_APPLY_LIKE_CLUB_BOARD, this.seqContext);
    },
    requestDeleteLike() {
      return this.$store.dispatch(BoardActionTypes.REQUEST_DELETE_LIKE_CLUB_BOARD, this.seqContext);
    },
  },
});
</script>

<style scoped>
.content {
  white-space: pre-wrap;
  word-break: break-all;
  width: 100%;
}
</style>
