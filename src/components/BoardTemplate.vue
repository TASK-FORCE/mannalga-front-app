<template>
  <div
    v-if="!$store.state.ui.loading"
    class="board-template"
  >
    <div class="board-header">
      <UserProfileAvatar
        :size="30"
        :imgUrl="boardVo.writer.imgUrl"
        :name="boardVo.writer.name"
        :appendNumber="boardVo.writer.writerUserSeq"
      />
      <div class="creator-name ml-2">
        {{ boardVo.writer.name }}
      </div>
      <RoleTag
        v-if="isNotMember"
        :roleType="role"
        small
        class="ml-2 my-auto"
      />
      <v-spacer />
      <div
        v-if="boardVo.categoryName"
        class="category"
      >
        {{ boardVo.categoryName }}
      </div>
    </div>
    <slot name="content" />
    <MiddleDivider :height="1" />
    <div class="count-info">
      <div
        v-ripple
        class="like-count-info"
        @click="clickLike"
      >
        <div>
          <v-icon
            class="like-icon icon"
            :class="boardVo.isLiked ? 'is-like' : ''"
            v-text="boardVo.isLiked ? '$heart' : '$heartOut'"
          />
        </div>
        <div
          class="d-flex ml-1"
          :class="boardVo.isLiked ? 'is-like' : ''"
        >
          <div>좋아요</div>
          <div
            class="count"
            :class="boardVo.isLiked ? 'is-like' : ''"
          >{{ boardVo.likeCnt }}
          </div>
        </div>
      </div>
      <div class="comment-count-info ml-4">
        <div>
          <v-icon
            class="icon"
            v-text="'$commentOut'"
          />
        </div>
        <div class="d-flex ml-1">
          <div>댓글</div>
          <div class="count">{{ boardVo.commentCnt }}</div>
        </div>
      </div>
      <v-spacer />
      <div class="date">
        {{ date }}
      </div>
    </div>
    <MiddleDivider :height="5" />

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
              :requestEditComment="boardTemplateContext.requestEditComment"
              :requestDeleteComment="boardTemplateContext.requestDeleteComment"
            />
            <MiddleDivider :height="1" />
          </div>
        </template>
      </InfiniteScrollTemplate>
    </div>
    <CommentWriteFooter
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
import RoleTag from '@/components/tag/RoleTag.vue';
import { ClubRole } from '@/utils/role';
import { DateUtils } from '@/utils/date';

export default Vue.extend({
  name: 'BoardTemplate',
  components: {
    RoleTag,
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
  computed: {
    role(): string {
      return this.boardVo.writer.role[0] || '';
    },
    isNotMember(): boolean {
      return this.role !== ClubRole.MEMBER;
    },
    date(): string {
      return this.boardVo.createdAt ? DateUtils.getKoreanLocalDate(this.boardVo.createdAt) : '';
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
    clickLike() {
      if (this.boardVo.isLiked) {
        this.boardTemplateContext.requestDeleteLike();
      } else {
        this.boardTemplateContext.requestApplyLike();
      }
    }
  },
});
</script>

<style
  scoped
  lang="scss"
>
.board-template {

  .board-header {
    display: flex;
    align-items: center;
    padding: 10px 20px;

    .creator-name {
      font-weight: bold;
      color: #292929;
    }

    .category {
      font-weight: bold;
      color: #666666;
    }
  }

  .count-info {
    display: flex;
    padding: 10px 20px;
    font-size: 13px;
    align-items: center;
    color: #666666;

    .like-count-info, .comment-count-info {
      display: flex;

      .icon {
        color: #666666;
        font-size: 15px !important;
        width: 15px !important;
        height: 15px !important;
      }

      .count {
        margin-left: 2px;
        color: #2883C6;
      }

    }

    .like-count-info {
      .like-icon {
        padding-bottom: 2px !important;
      }

      .is-like {
        color: #E3343C !important;
      }
    }

    .date {
      color: #9f9f9f;
    }
  }
}

.theme--dark {
  .board-template {
    .creator-name {
      color: #F5F5F5;
    }

    .category {
      color: #9f9f9f;
    }

    .count-info, .icon {
      color: #9f9f9f;
    }

    .date {
      color: #666666;
    }
  }

}
</style>
