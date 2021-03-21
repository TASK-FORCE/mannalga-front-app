<template>
  <div>
    <div
      v-ripple
      @click="clickBoard"
    >
      <div class="d-flex align-center pa-2">
        <UserProfileAvatar
          :size="30"
          :imgUrl="board.writer.imgUrl"
          :name="board.writer.name"
          :appendNumber="board.writer.writerUserSeq"
        />
        <div class="d-flex align-center">
          <div class="board-writer-name d-flex">
            <span class="my-auto">{{ board.writerName }}</span>
          </div>
          <!--                    <div>-->
          <!--                        <RoleChip v-if="board.writer.role[0] === 'MASTER' || board.writer.role[0] === 'MANAGER'"-->
          <!--                                  :role="board.writer.role[0]"-->
          <!--                                  class="ml-1"-->
          <!--                                  outlined-->
          <!--                                  style="margin-bottom: 1px; font-size: 0.5rem;"-->
          <!--                        />-->
          <!--                    </div>-->
          <VerticalBarDivider class="my-auto" />
          <div class="board-write-datetime">
            {{ board.createAt }}
          </div>
        </div>
        <v-spacer />
        <Chip
          :info="getCategoryInfo(board.category)"
          color="green"
          :radius="7"
          class="px-2 py-1"
        />
      </div>
      <v-divider />
      <div class="py-2 pl-3 pr-2 d-flex">
        <div>
          <div class="font-weight-bold">
            {{ board.title }}
          </div>
          <div class="board-content-wrapper">
            <div class="mt-1 board-content">
              {{ board.simpleContent }}
            </div>
          </div>
          <v-spacer />
          <div class="d-flex">
            <div>
              <v-icon
                color="#f50e22"
                small
                v-text="'$heart'"
              />
              <span class="f-09">
                                        {{ board.likeCnt }}
                                    </span>
            </div>
            <div class="ml-3">
              <v-icon
                color="#2196f3"
                small
                v-text="'$commentMultiple'"
              />
              <span class="f-09">
                                        {{ board.commentCnt }}
                            </span>
            </div>
          </div>
        </div>
        <v-spacer />
        <div
          v-if="board.mainImageUrl"
          class="py-2 d-flex"
        >
          <v-img
            :src="board.mainImageUrl"
            height="90"
            width="110"
            class="my-auto"
            style="border-radius: 10px"
          />
        </div>
      </div>
    </div>
    <MiddleDivider :height="7" />
  </div>
</template>

<script lang="ts">
import MiddleDivider from '@/components/MiddleDivider.vue';
import Chip from '@/components/chip/Chip.vue';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import routerHelper from '@/router/RouterHelper.ts';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import Vue from 'vue';
import { BoardCategory } from '@/interfaces/board/BoardCategory';

export default Vue.extend({
  name: 'ClubDetailBoardPost',
  components: { UserProfileAvatar, VerticalBarDivider, Chip, MiddleDivider },
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    clickBoard() {
      this.$router.push(generateParamPath(PATH.CLUB.BOARD_POST, [routerHelper.clubSeq(), this.board.boardSeq]));
    },
    getCategoryInfo(categoryType): BoardCategory {
      return BoardCategory.findCategoryByType(categoryType);
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.board-writer-name {
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 6px;
}

.board-write-datetime {
  font-size: 0.9rem;
  color: #959595;
}

.board-content-wrapper {
  height: 60px;
  display: flex;

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
</style>
