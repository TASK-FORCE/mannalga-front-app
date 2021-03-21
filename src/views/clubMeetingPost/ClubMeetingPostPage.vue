<template>
  <div>
    <CommonHeader
      title="만남"
      @back="$router.push(clubDetailPath())"
    />
    <ClubMeetingPostBody />
  </div>
</template>

<script lang="ts">
import CommonHeader from '@/components/header/CommonHeader.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import ClubMeetingPostBody from '@/views/clubMeetingPost/ClubMeetingPostBody.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'ClubMeetingPostPage',
  components: { ClubMeetingPostBody, CommonHeader },
  methods: {
    clubDetailPath() {
      return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
    },
  },
});
</script>

<style scoped>

</style>
