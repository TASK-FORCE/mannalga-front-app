<template>
  <div>
    <MenuHeader
      title="게시판"
      :menus="menus"
      @back="moveToClubMainPage"
    />
    <ClubBoardPostBody :board="board" />
    <YesOrNoDialog
      v-model="deleteDialog"
      title="게시판을 정말 삭제하시겠습니까?"
      submitText="삭제"
      :submitPromiseCallback="deleteBoard"
    />
  </div>
</template>

<script lang="ts">
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import ClubBoardPostBody from '@/views/clubBoardPost/ClubBoardPostBody.vue';
import Vue from 'vue';
import MenuHeader from '@/components/header/MenuHeader.vue';
import { ClickWithText } from '@/interfaces/common';
import { Board } from '@/interfaces/board/board';
import { mixin } from '@/mixin/mixin';
import { CurrentUserInfo } from '@/interfaces/club';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';

export default Vue.extend({
  name: 'ClubBoardPostPage',
  components: { YesOrNoDialog, MenuHeader, ClubBoardPostBody },
  mixins: [mixin],
  data() {
    return {
      deleteDialog: false,
    };
  },
  computed: {
    board(): Board {
      return this.$store.state.board.board;
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
    isWriter(): boolean {
      return this.board.writer.writerUserSeq === this.currentUserInfo.userSeq;
    },
    editMenu(): ClickWithText {
      return {
        text: '수정',
        click: this.moveToBoardEditPage,
      }
    },
    deleteMenu(): ClickWithText {
      return {
        text: '삭제',
        click: () => (this.deleteDialog = true),
      }
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
    moveToClubMainPage() {
      routerHelper.moveToClubMainPage();
    },
    deleteBoard() {
      this.$store.dispatch(BoardActionTypes.REQUEST_CLUB_BOARD_DELETE, {
        clubSeq: routerHelper.clubSeq(),
        boardSeq: routerHelper.boardSeq(),
      })
        .then(() => {
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_DELETE_BOARD)
          this.moveToClubMainPage();
        })
    },
    moveToBoardEditPage() {
      this.$router.push(generateParamPath(PATH.CLUB.BOARD_EDIT, [routerHelper.clubSeq(), routerHelper.boardSeq()]))
    }
  }
});
</script>

<style scoped>

</style>
