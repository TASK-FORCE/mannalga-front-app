<template>
  <BoardTemplate
    :boardVo="boardVo"
    :boardTemplateContext="boardTemplateContext"
  >
    <template #content>
      <div class="content">
        <div
          class="font-weight-bold"
          v-text="album.title"
        />
        <ImageWithDialog
          class="elevation-1 mt-2"
          :imgUrl="album.imgUrl"
        />
      </div>
    </template>
  </BoardTemplate>
</template>

<script lang="ts">
import ImageWithDialog from '@/components/image/ImageWithDialog.vue';
import routerHelper from '@/router/RouterHelper.ts';
import BoardTemplate from '@/components/BoardTemplate.vue';
import Vue, { PropType } from 'vue';
import { AlbumMutationTypes } from '@/store/type/mutationTypes';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import {
  Album,
  AlbumCommentDeleteRequest,
  AlbumCommentEditRequest,
  AlbumCommentWriteRequest,
  AlbumSeqContext,
  AlbumSubCommentRequest
} from '@/interfaces/album';
import { BoardTemplateContext, BoardVo, Comment } from '@/interfaces/common';

export default Vue.extend({
  name: 'ClubAlbumPostBody',
  components: {
    BoardTemplate,
    ImageWithDialog,
  },
  props: {
    album: {
      type: Object as PropType<Album>,
      required: true,
    }
  },
  computed: {
    seqContext(): AlbumSeqContext {
      return {
        clubSeq: routerHelper.clubSeq(),
        albumSeq: routerHelper.albumSeq(),
      };
    },
    boardVo(): BoardVo {
      return {
        writer: this.album.writer,
        title: this.album.title,
        isLiked: this.album.isLiked,
        likeCnt: this.album.likeCnt,
        commentCnt: this.album.commentCnt,
      };
    },
    boardTemplateContext(): BoardTemplateContext {
      return {
        commentList: this.$store.state.album.albumCommentList,
        commentPage: this.$store.state.album.albumCommentPage,
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
    this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM, this.seqContext)
      .catch(() => this.$router.back());
  },
  beforeDestroy() {
    this.$store.commit(AlbumMutationTypes.INIT_ALBUM_COMMENT_LIST);
  },
  methods: {
    fetchFirstPage(): Promise<void> {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_COMMENT_LIST, this.seqContext);
    },
    fetchNextPage(): Promise<void> {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_NEXT_ALBUM_COMMENT_LIST, this.seqContext);
    },
    requestWriteComment(content: string): Promise<void> {
      const albumCommentWriteRequest: AlbumCommentWriteRequest = {
        albumSeqContext: this.seqContext,
        content: content,
      };
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_COMMENT_WRITE, albumCommentWriteRequest)
        .then(() => this.$store.commit(AlbumMutationTypes.COUNT_ALBUM_COMMENT_CNT, this.album.albumSeq));
    },
    requestEditComment(content: string, commentSeq: number): Promise<void> {
      const albumCommentEditRequest: AlbumCommentEditRequest = {
        albumSeqContext: this.seqContext,
        commentSeq: commentSeq,
        content: content,
      }
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_COMMENT_EDIT, albumCommentEditRequest);
    },
    requestDeleteComment(commentSeq: number, parentSeq?: number): Promise<void> {
      const albumCommentDeleteRequest: AlbumCommentDeleteRequest = {
        albumSeqContext: this.seqContext,
        commentSeq: commentSeq,
      }
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_COMMENT_DELETE, albumCommentDeleteRequest)
        .then(() => {
          const requestForSubComment = !!parentSeq;
          if (requestForSubComment) {
            this.$store.commit(AlbumMutationTypes.UN_COUNT_CHILD_COMMENT_CNT, parentSeq);
          }
          this.$store.commit(AlbumMutationTypes.REMOVE_COMMENT_OF_COMMENT_LIST, commentSeq);
          this.$store.commit(AlbumMutationTypes.UN_COUNT_ALBUM_COMMENT_CNT, this.album.albumSeq);
        });
    },
    requestWriteSubComment(content: string, parentSeq: number): Promise<void> {
      const albumCommentWriteRequest: AlbumCommentWriteRequest = {
        albumSeqContext: this.seqContext,
        parentCommentSeq: parentSeq,
        content
      };
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_COMMENT_WRITE, albumCommentWriteRequest)
        .then(() => {
          this.$store.commit(AlbumMutationTypes.COUNT_CHILD_COMMENT_CNT, parentSeq);
          this.$store.commit(AlbumMutationTypes.COUNT_ALBUM_COMMENT_CNT, this.album.albumSeq)
        });
    },
    requestSubCommentList(parentSeq: number): Promise<Comment[]> {
      const albumSubCommentRequest: AlbumSubCommentRequest = {
        ...this.seqContext,
        parentCommentSeq: parentSeq,
      };
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALL_ALBUM_SUB_COMMENT_LIST, albumSubCommentRequest);
    },
    commentWritePostProcess(): Promise<void> {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_ALL_ALBUM_COMMENT_LIST_WITH_PAGING, this.seqContext);
    },
    requestApplyLike(): Promise<void> {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_APPLY_LIKE_CLUB_ALBUM, this.seqContext);
    },
    requestDeleteLike(): Promise<void> {
      return this.$store.dispatch(AlbumActionTypes.REQUEST_DELETE_LIKE_CLUB_ALBUM, this.seqContext);
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
