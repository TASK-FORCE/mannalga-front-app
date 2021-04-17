<template>
  <div class="comment">
    <div class="comment-header">
      <UserProfileAvatar
        :size="28"
        :name="comment.writer"
        :appendNumber="comment.writerSeq"
        :imgUrl="comment.imgUrl"
      />
      <div class="writer">
        {{ comment.writer }}
      </div>
      <div
        v-if="isWriter"
        class="writer-tag"
      >
        <div class="writer-tag-text">
          내댓글
        </div>
      </div>
      <v-spacer />
      <div v-if="menus.length > 0">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              x-small
              icon
              class="menu-btn"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-text="'$dotsVertical'" />
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item
              v-for="menu in menus"
              :key="menu.text"
              @click="menu.click"
            >
              <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div
      class="comment-content"
      :class="comment.isDeleted ? 'deleted' : ''"
    >
      {{ comment.content }}
    </div>
    <div class="comment-footer">
      <div class="date">
        {{ date }}
      </div>
      <div
        v-if="isRootComment && !comment.isDeleted"
        v-ripple
        class="button write-comment-btn font-weight-bold"
        role="button"
        @click="openSubCommentWriteDialog = true"
      >
        답글 쓰기
      </div>
    </div>
    <div class="comment-show-more">
      <div
        v-if="hasChildComment"
        class="w-100"
      >
        <div
          v-if="showChildComments"
          class="w-100"
        >
          <div
            v-if="subCommentLandingLoading"
            class="w-100 text-center"
          >
            <v-progress-circular
              indeterminate
              color="red"
              :size="20"
              :width="2"
            />
          </div>
          <div v-else>
            <div :class="`sub-comments-${commentSeq}`">
              <div
                v-for="(childComment, index) in childComments"
                :key="index"
              >
                <Comment
                  style="padding-right: 0"
                  :comment="childComment"
                  :requestEditComment="editChildComment"
                  :requestDeleteComment="deleteChildComment"
                />
              </div>
            </div>
            <div
              v-ripple
              class="d-flex align-center"
              @click="showChildComments = false"
            >
              <div class="show-more-text">
                답글 숨기기
              </div>
              <div class="ml-1">
                <v-icon
                  class="show-more-icon"
                  v-text="'$chevronUp'"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            v-ripple
            class="d-flex align-center"
            @click="clickShowChildComments"
          >
            <div class="show-more-text">
              답글 {{ comment.childCommentCnt }}개 더보기
            </div>
            <div class="ml-1">
              <v-icon
                class="show-more-icon"
                v-text="'$chevronDown'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommentWriteDialog
      v-if="openSubCommentWriteDialog"
      v-model="openSubCommentWriteDialog"
      :title="`${comment.writer}님에게 댓글 작성`"
      submitText="작성"
      :submitPromiseCallback="submitSubComment"
    />
    <CommentWriteDialog
      v-if="openCommentEditDialog"
      v-model="openCommentEditDialog"
      title="댓글 수정"
      submitText="수정"
      :initContent="comment.content"
      :submitPromiseCallback="editComment"
    />
    <YesOrNoDialog
      v-if="openCommentDeleteDialog"
      v-model="openCommentDeleteDialog"
      title="댓글을 정말 삭제하시겠습니까?"
      submitText="삭제"
      :submitPromiseCallback="deleteComment"
    />
  </div>
</template>

<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import _ from '@/utils/common/lodashWrapper.ts';
import { ScrollHelper } from '@/utils/scroll.ts';
import Vue, { PropType } from 'vue';
import { ClickWithText, Comment } from '@/interfaces/common';
import { DateUtils } from '@/utils/date';
import CommentWriteDialog from '@/components/comment/CommentWriteDialog.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { CurrentUserInfo } from '@/interfaces/club';

function getHeightAppender(offsetHeight: number) {
  const footerSize = 50;
  const foldBtnSize = 28;
  const subCommentWriterSize = 27;
  const spaceSize = 6;
  return (offsetHeight * 2) + footerSize + foldBtnSize + subCommentWriterSize + spaceSize;
}

export default Vue.extend({
  name: 'Comment',
  components: { YesOrNoDialog, CommentWriteDialog, UserProfileAvatar },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
    requestWriteSubComment: {
      type: Function as PropType<(content: string, parentSeq: number) => Promise<void>>,
      required: false,
    },
    requestSubCommentList: {
      type: Function as PropType<(parentSeq: number) => Promise<Comment[]>>,
      required: false,
    },
    requestEditComment: {
      type: Function as PropType<(content: string, commentSeq: number) => Promise<void>>,
      required: true,
    },
    requestDeleteComment: {
      type: Function as PropType<(commentSeq: number, parentSeq?: number) => Promise<void>>,
      required: true,
    },
  },
  data() {
    return {
      childComments: [] as Comment[],
      subCommentSubmitLoading: false as boolean,
      subCommentLandingLoading: false as boolean,
      showChildComments: false as boolean,
      EMPTY_COMMENT_TEXT: MESSAGE.EMPTY_COMMENT_TEXT as string,
      openSubCommentWriteDialog: false,
      openCommentEditDialog: false,
      openCommentDeleteDialog: false,
    };
  },
  computed: {
    isWriter(): boolean {
      return this.comment.isWrittenByMe;
    },
    hasChildComment(): boolean {
      return this.comment.childCommentCnt > 0;
    },
    isRootComment(): boolean {
      return this.comment.depth === 1;
    },
    date(): string {
      return DateUtils.getKoreanLocalDate(this.comment.registerTime);
    },
    commentSeq(): number {
      return this.comment.commentSeq;
    },
    editMenu(): ClickWithText {
      return {
        text: '수정',
        click: () => {
          this.openCommentEditDialog = true;
        }
      };
    },
    deleteMenu(): ClickWithText {
      return {
        text: '삭제',
        click: () => {
          this.openCommentDeleteDialog = true;
        }
      }
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
    menus(): ClickWithText[] {
      if (this.isWriter) {
        return [this.editMenu, this.deleteMenu];
      }

      if (this.currentUserInfo.isManager || this.currentUserInfo.isMaster) {
        return [this.deleteMenu];
      }

      return [];
    }
  },
  methods: {
    settingChildComment() {
      this.subCommentLandingLoading = true;
      if (!this.requestSubCommentList) {
        throw new Error('requestSubCommentList should not be undefined');
      }
      this.requestSubCommentList(this.commentSeq)
        .then((subComments: Comment[]) => (this.childComments = subComments))
        .finally(() => {
          if (this.childComments.length > 0) {
            this.moveToLastComment();
          }
          this.subCommentLandingLoading = false;
        });
    },
    moveToLastComment() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          const subCommentWrapper = document.querySelector(`.sub-comments-${this.commentSeq}`) as HTMLElement;
          if (!subCommentWrapper) {
            return;
          }
          const subComments: HTMLCollection = subCommentWrapper.children;
          if (_.isEmpty(subComments)) {
            return;
          }
          const lastComment: HTMLElement = subComments[subComments.length - 1] as HTMLElement;
          const appender = getHeightAppender(lastComment.offsetHeight);
          const position = lastComment.offsetTop - window.innerHeight + appender;
          if (position > window.scrollY) {
            ScrollHelper.scrollTo(position);
          }
        });
      });
    },
    submitSubComment(content: string) {
      if (!this.requestWriteSubComment) {
        throw new Error('requestWriteSubComment should not be undefined');
      }
      return this.requestWriteSubComment(content, this.commentSeq)
        .then(() => {
          this.showChildComments = true;
          this.settingChildComment();
          this.moveToLastComment();
        })
    },
    clickShowChildComments() {
      this.showChildComments = true;
      if (_.isEmpty(this.childComments)) {
        this.settingChildComment()
      }
      this.moveToLastComment();
    },
    editComment(content: string) {
      return this.requestEditComment(content, this.commentSeq);
    },
    deleteComment() {
      return this.requestDeleteComment(this.commentSeq);
    },
    editChildComment(content: string, commentSeq: number) {
      return this.requestEditComment(content, commentSeq)
        .then(() => {
          this.childComments = this.childComments
            .map(comment => {
              if (comment.commentSeq === commentSeq) {
                return {
                  ...comment,
                  content: content,
                }
              }
              return comment;
            })
        });
    },
    deleteChildComment(commentSeq: number) {
      return this.requestDeleteComment(commentSeq, this.commentSeq)
        .then(() => {
          this.childComments = this.childComments.filter(comment => comment.commentSeq !== commentSeq);
        });
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.comment {
  padding: 10px 20px;

  .comment-header {
    display: flex;
    align-items: center;

    .writer {
      font-weight: bold;
      color: #292929;
      font-size: 15px;
      margin-left: 8px;
    }

    .writer-tag {
      margin-left: 8px;
      font-size: 10px;
      border: 1px solid #2883C6;
      color: #2883C6;
      border-radius: 4px;
      font-weight: bold;

      .writer-tag-text {
        padding: 1px 4px;
      }
    }
  }

  .comment-content {
    padding-left: 36px;
    font-size: 14px;
    color: #292929;
  }

  .comment-content.deleted {
    color: #9f9f9f;
  }

  .comment-footer {
    display: flex;
    padding-left: 36px;
    font-size: 12px;
    margin-top: 2px;

    .date {
      color: #9f9f9f;
    }

    .write-comment-btn {
      color: #9f9f9f;
      margin-left: 8px;
    }
  }

  .comment-show-more {
    display: flex;
    padding-left: 36px;
    padding-top: 10px;

    .show-more-text {
      font-weight: bold;
      color: #292929;
      font-size: 14px;
    }

    .show-more-icon {
      color: #292929;
      padding-bottom: 2px;
    }
  }

}

.theme--dark {
  .writer, .comment-content, .show-more-text, .show-more-icon {
    color: #F5F5F5 !important;
  }

  .comment-content.deleted {
    color: #666666 !important;
  }

  .date, .write-comment-btn {
    color: #666666 !important;
  }
}
</style>
