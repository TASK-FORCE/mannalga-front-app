<template>
  <div v-if="!$store.state.ui.loading">
    <div class="d-flex px-2 mt-3">
      <UserProfileAvatar
        :size="40"
        :imgUrl="boardVo.writerImage"
        :name="boardVo.writerName"
        :appendNumber="boardVo.writerSeq"
      />
      <div class="ml-2">
        <div class="title">{{ boardVo.title }}</div>
        <div class="f-09">
          {{ boardVo.writerName }}
        </div>
      </div>
    </div>
    <slot name="content" />
    <MiddleDivider :height="2" />
    <div class="d-flex pa-3">
      <v-btn
        v-if="!boardVo.isLiked"
        outlined
        small
        color="#2196f3"
        @click="boardTemplateContext.requestApplyLike"
      >
        <v-icon
          left
          small
          v-text="'$heart'"
        />
        <span class="f-09">좋아요</span>
      </v-btn>
      <v-btn
        v-else
        outlined
        small
        @click="boardTemplateContext.requestDeleteLike"
      >
        <v-icon
          left
          small
          v-text="'$heart'"
        />
        <span class="f-09">좋아요 취소</span>
      </v-btn>
      <v-spacer />
      <div class="d-lg-flex my-auto">
        <div>
          <span class="like-count-text">{{ boardVo.likeCnt }}명</span>이 사진을 좋아합니다.
        </div>
      </div>
    </div>
    <MiddleDivider :height="2" />

    <div class="px-1 h-100">
      <InfiniteScrollTemplate
        name="comment"
        :firstPageCallback="boardTemplateContext.fetchFirstPage"
        :nextPageCallback="boardTemplateContext.fetchNextPage"
        :pageElements="boardTemplateContext.commentList"
        :pageInfo="boardTemplateContext.commentPage"
        :withListGroup="false"
      >
        <template v-slot:list-main>
          <div
            v-for="(comment, index) in boardTemplateContext.commentList"
            :key="index"
          >
            <Comment
              :comment="comment"
              :requestWriteSubComment="boardTemplateContext.requestWriteSubComment"
              :requestSubCommentList="boardTemplateContext.requestSubCommentList"
            />
          </div>
        </template>
      </InfiniteScrollTemplate>
    </div>
    <CommentWriteFooter
      v-if="!$store.state.ui.focusingChildCommentInput"
      :requestWriteComment="boardTemplateContext.requestWriteComment"
      :postProcessor="callbackAfterCommentWrite"
    />
  </div>
</template>


<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import Comment from '@/components/comment/Comment.vue';
import CommentWriteFooter from '@/components/comment/CommentWriteFooter.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import { ScrollHelper } from '@/utils/scroll.ts';
import Vue, { PropType } from 'vue';
import { BoardTemplateContext, BoardVo } from '@/interfaces/common';

export default Vue.extend({
  name: 'BoardTemplate',
  components: {
    InfiniteScrollTemplate,
    CommentWriteFooter,
    Comment,
    MiddleDivider,
    UserProfileAvatar,
  },
  props: {
    boardVo: {
      type: Object as PropType<BoardVo>,
      required: true,
    },
    boardTemplateContext: {
      type: Object as PropType<BoardTemplateContext>,
      required: true,
    },
  },
  methods: {
    callbackAfterCommentWrite() {
      this.boardTemplateContext.commentWritePostProcess()
        .then(() => this.scrollToBottomWhenLastPage());
    },
    scrollToBottomWhenLastPage() {
      if (this.boardTemplateContext.commentPage.isLastPage) {
        ScrollHelper.scrollToBottom();
        return;
      }
      setTimeout(this.scrollToBottomWhenLastPage, 100);
    },
  },
});
</script>

<style scoped>
.title {
  font-weight: 700;
  font-size: 1.05rem;
}

.like-count-text {
  font-weight: bold;
}
</style>
