<template>
  <div>
    <CommonHeader
      title="게시글 작성"
      @back="$router.push(getClubPath())"
    />
    <ClubBoardCreatePageBody />
  </div>
</template>

<script lang="ts">

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubBoardCreatePageBody from '@/views/clubBoardCreate/ClubBoardCreatePageBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import Vue from 'vue';
import routerHelper from '@/router/RouterHelper';

export default Vue.extend({
  name: 'ClubCreate',
  components: { CommonHeader, ClubBoardCreatePageBody },
  methods: {
    getClubPath() {
      return generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]);
    }
  }
});
</script>

<style scoped>
</style>
