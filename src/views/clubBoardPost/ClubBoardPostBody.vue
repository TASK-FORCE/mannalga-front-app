<template>
  <BoardTemplate
    :boardVo="boardVo"
    :boardTemplateContext="boardTemplateContext"
  >
    <template #content>
      <div class="content">
        <div
          class="font-weight-bold"
          v-text="board.title"
        />
        <div
          class="description"
          v-text="board.content"
        />
        <div
          v-for="image in board.imageList"
          :key="image.imgSeq"
        >
          <ImageWithDialog
            class="mt-2"
            :imgUrl="image.imgUrl"
          />
        </div>
      </div>
    </template>
  </BoardTemplate>
</template>

<script lang="ts">
import routerHelper from '@/router/RouterHelper.ts';
import BoardTemplate from '@/components/BoardTemplate.vue';
import Vue, { PropType } from 'vue';
import { BoardMutationTypes } from '@/store/type/mutationTypes';
import { BoardActionTypes } from '@/store/type/actionTypes';
import {
  Board,
  BoardCommentDeleteRequest,
  BoardCommentEditRequest,
  BoardCommentWriteRequest,
  BoardSeqContext,
  BoardSubCommentRequest
} from '@/interfaces/board/board';
import { BoardTemplateContext, BoardVo, Comment } from '@/interfaces/common';
import { BoardCategory } from '@/interfaces/board/BoardCategory';
import ImageWithDialog from '@/components/image/ImageWithDialog.vue';
import { generateParamPath, PATH } from '@/router/route_path_type';

export default Vue.extend({
  name: 'ClubBoardPostBody',
  components: {
    ImageWithDialog,
    BoardTemplate,
  },
  props: {
    board: {
      type: Object as PropType<Board>,
      required: true,
    }
  },
  computed: {
    seqContext(): BoardSeqContext {
      return {
        clubSeq: routerHelper.clubSeq(),
        boardSeq: routerHelper.boardSeq(),
      };
    },
    boardVo(): BoardVo {
      return {
        writer: this.board.writer,
        title: this.board.title,
        isLiked: this.board.isLiked,
        likeCnt: this.board.likeCnt,
        categoryName: BoardCategory.findCategoryByType(this.board.category).name,
        createdAt: this.board.createdAt,
        commentCnt: this.board.commentCnt,
      };
    },
    boardTemplateContext(): BoardTemplateContext {
      return {
        commentList: this.$store.state.board.boardCommentList,
        commentPage: this.$store.state.board.boardCommentPage,
        fetchFirstPage: this.fetchFirstPage,
        fetchNextPage: this.fetchNextPage,
        requestWriteComment: this.requestWriteComment,
        requestEditComment: this.requestEditComment,
        requestDeleteComment: this.requestDeleteComment,
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
      .catch((e) => routerHelper.pushWhenException(e, generateParamPath(PATH.CLUB.MAIN, [this.seqContext.clubSeq])));
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
    requestEditComment(content: string, commentSeq: number): Promise<void> {
      const boardCommentEditRequest: BoardCommentEditRequest = {
        boardSeqContext: this.seqContext,
        content: content,
        commentSeq: commentSeq,
      };
      return this.$store.dispatch(BoardActionTypes.REQUEST_BOARD_COMMENT_EDIT, boardCommentEditRequest);
    },
    requestDeleteComment(commentSeq: number, parentSeq?: number): Promise<void> {
      const boardCommentDeleteRequest: BoardCommentDeleteRequest = {
        boardSeqContext: this.seqContext,
        commentSeq: commentSeq,
      };
      return this.$store.dispatch(BoardActionTypes.REQUEST_BOARD_COMMENT_DELETE, boardCommentDeleteRequest)
        .then(() => {
          const requestForSubComment = !!parentSeq;
          if (requestForSubComment) {
            this.$store.commit(BoardMutationTypes.UN_COUNT_COMMENT_CNT_OF_PARENT_COMMENT, parentSeq);
          }
          this.$store.commit(BoardMutationTypes.REMOVE_COMMENT_OF_COMMENT_LIST, commentSeq);
          this.$store.commit(BoardMutationTypes.UN_COUNT_COMMENT_CNT_OF_BOARD, this.board.boardSeq);
        });
    },
    requestWriteSubComment(content: string, parentCommentSeq: number): Promise<void> {
      const boardCommentWriteRequest: BoardCommentWriteRequest = {
        boardSeqContext: this.seqContext,
        parentCommentSeq,
        content
      };
      return this.$store.dispatch(BoardActionTypes.REQUEST_BOARD_COMMENT_WRITE, boardCommentWriteRequest)
        .then(() => {
          this.$store.commit(BoardMutationTypes.COUNT_COMMENT_CNT_OF_BOARD, this.board.boardSeq);
          this.$store.commit(BoardMutationTypes.COUNT_COMMENT_CNT_OF_PARENT_COMMENT, parentCommentSeq);
        });
    },
    requestSubCommentList(parentCommentSeq: number): Promise<Comment[]> {
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

<style
  scoped
  lang="scss"
>
.content {
  padding: 10px 20px;
  font-size: 15px;
  color: #292929;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-all;
}

.theme--dark {
  .content {
    color: #F5F5F5;
  }
}
</style>
