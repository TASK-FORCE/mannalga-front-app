<template>
  <div>
    <MenuHeader
      title="게시판"
      :menus="menus"
      @back="$router.push(clubDetailPath())"
    />
    <ClubBoardPostBody :board="board" />
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

export default Vue.extend({
  name: 'ClubBoardPostPage',
  components: { MenuHeader, ClubBoardPostBody },
  computed: {
    board(): Board {
      return this.$store.state.board.board;
    },
    editMenu(): ClickWithText {
      return {
        text: '수정',
        click: this.moveToBoardEditPage,
      }
    },
    menus(): ClickWithText[] {
      return [];
    }
  },
  methods: {
    clubDetailPath() {
      return generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]);
    },
    moveToBoardEditPage() {
      this.$router.push(generateParamPath(PATH.CLUB.BOARD_EDIT, [routerHelper.clubSeq(), routerHelper.boardSeq()]))
    }
  }
});
</script>

<style scoped>

</style>
