<template>
  <div>
    <div v-if="isNotice">
      <MiddleDivider :height="1" />
      <NoticeBoardPost
        v-ripple
        :board="board"
        @click="clickBoard"
      />
    </div>
    <div v-else>
      <MiddleDivider :height="5" />
      <NormalBoardPost
        v-ripple
        :board="board"
        @click="clickBoard"
      />
    </div>
  </div>
</template>

<script lang="ts">
import MiddleDivider from '@/components/MiddleDivider.vue';
import routerHelper from '@/router/RouterHelper.ts';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import Vue, { PropType } from 'vue';
import { BoardCategoryType, BoardFeed } from '@/interfaces/board/board';
import NoticeBoardPost from '@/views/clubDetail/components/board/NoticeBoardPost.vue';
import NormalBoardPost from '@/views/clubDetail/components/board/NormalBoardPost.vue';

export default Vue.extend({
  name: 'ClubDetailBoardPost',
  components: { NormalBoardPost, NoticeBoardPost, MiddleDivider },
  props: {
    board: {
      type: Object as PropType<BoardFeed>,
      required: true,
    },
  },
  computed: {
    isNotice(): boolean {
      return this.board.category === BoardCategoryType.NOTICE;
    }
  },
  methods: {
    clickBoard() {
      console.log('??')
      this.$router.push(generateParamPath(PATH.CLUB.BOARD_POST, [routerHelper.clubSeq(), this.board.boardSeq]));
    },
  },
});
</script>
