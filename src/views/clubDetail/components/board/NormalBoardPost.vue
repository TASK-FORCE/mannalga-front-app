<template>
  <div
    class="board"
    role="button"
    @click="$emit('click')"
  >
    <div class="board-header">
      <UserProfileAvatar
        :size="30"
        :imgUrl="board.writer.imgUrl"
        :name="board.writer.name"
        :appendNumber="board.writer.writerUserSeq"
      />
      <div class="d-flex">
        <div class="board-writer-name my-auto">
          {{ board.writer.name }}
        </div>
        <RoleTag
          v-if="isNotMember"
          :roleType="role"
          small
          class="ml-2 my-auto"
        />
      </div>
      <v-spacer />
      <div class="board-category">{{ getCategoryName(board.category) }}</div>
    </div>
    <MiddleDivider :height="1" />
    <div class="board-body">
      <div>
        <div class="font-weight-bold">
          {{ board.title }}
        </div>
        <div class="d-flex">
          <div class="mt-1 board-content">
            {{ board.simpleContent }}
          </div>
        </div>
      </div>
      <v-spacer />
      <div
        v-if="board.mainImageUrl"
        class="d-flex"
      >
        <v-img
          :src="board.mainImageUrl"
          height="73"
          width="73"
          class="my-auto"
          style="border-radius: 5px"
        />
      </div>
    </div>
    <MiddleDivider :height="1" />
    <div class="board-footer">
      <div class="d-flex align-center">
        <div class="mr-1">
          <v-icon
            size="17"
            :color="resolveIconColor"
            v-text="'$heartOut'"
          />
        </div>
        <div class="footer-text mr-1">
          좋아요
        </div>
        <div class="footer-count">
          {{ board.likeCnt }}
        </div>
      </div>
      <div class="ml-4 d-flex align-center">
        <div class="mr-1">
          <v-icon
            size="16"
            :color="resolveIconColor"
            v-text="'$commentOut'"
          />
        </div>
        <div class="footer-text mr-1">
          댓글
        </div>
        <div class="footer-count">
          {{ board.commentCnt }}
        </div>
      </div>
      <v-spacer />
      <div class="footer-date">
        {{ createdAt }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import Vue, { PropType } from 'vue';
import { BoardCategory } from '@/interfaces/board/BoardCategory';
import { BoardCategoryType, BoardFeed } from '@/interfaces/board/board';
import RoleTag from '@/components/tag/RoleTag.vue';
import { ClubRole } from '@/utils/role';
import MiddleDivider from '@/components/MiddleDivider.vue';
import { DateUtils } from '@/utils/date';

export default Vue.extend({
  name: 'NormalBoardPost',
  components: { MiddleDivider, RoleTag, UserProfileAvatar },
  props: {
    board: {
      type: Object as PropType<BoardFeed>,
      required: true,
    },
  },
  computed: {
    isNotice(): boolean {
      return this.board.category === BoardCategoryType.NOTICE;
    },
    role(): string {
      return this.board.writer.role[0];
    },
    isNotMember(): boolean {
      return this.role !== ClubRole.MEMBER;
    },
    resolveIconColor(): string {
      if (this.$store.state.ui.isDarkTheme) {
        return '#9f9f9f';
      }
      return '#666666';
    },
    createdAt(): string {
      return DateUtils.getKoreanLocalDate(this.board.createAt);
    }
  },
  methods: {
    getCategoryName(categoryType: string): string {
      return BoardCategory.findCategoryByType(categoryType).name;
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>

.board {

  .board-header {
    display: flex;
    padding: 10px 20px;

    .board-writer-name {
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
    }

    .board-category {
      color: #666666;
      font-weight: bold;
      font-size: 16px;
    }
  }

  .board-body {
    display: flex;
    padding: 10px 20px;
    font-size: 15px;

    .board-content {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
      height: 40px;
    }
  }

  .board-footer {
    display: flex;
    padding: 10px 20px;
    font-size: 13px;

    .footer-text {
      color: #666666;
    }

    .footer-count {
      color: #2883C6;
      font-weight: bold;
    }

    .footer-date {
      color: #9f9f9f;
    }
  }
}
</style>
