<template>
  <div>
    <ClubBoardCreateAndEdit
      headerTitle="게시글 작성"
      :submitClickCallback="submit"
      @back="$router.push(getClubPath())"
    />
  </div>
</template>

<script lang="ts">

import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import Vue from 'vue';
import routerHelper from '@/router/RouterHelper';
import ClubBoardCreateAndEdit from '@/views/clubBoardCreateAndEdit/ClubBoardCreateAndEdit.vue';
import { BoardWriteRequest, BoardWriteRequestWishSeq } from '@/interfaces/board/board';
import { BoardActionTypes } from '@/store/type/actionTypes';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubCreate',
  components: { ClubBoardCreateAndEdit },
  mixins: [mixin],
  methods: {
    getClubPath() {
      return generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]);
    },
    submit(boardWriteRequest: BoardWriteRequest) {
      const boardWriteRequestWishSeq: BoardWriteRequestWishSeq = {
        clubSeq: routerHelper.clubSeq(),
        boardWriteRequest: boardWriteRequest,
      }
      return this.$store.dispatch(BoardActionTypes.REQUEST_CLUB_BOARD_CREATE, boardWriteRequestWishSeq)
        .then(() => {
          this.$store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, { clubSeq: routerHelper.clubSeq() });
          this.$router.push(generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]));
        })
    },
  }
});
</script>

<style scoped>
</style>
