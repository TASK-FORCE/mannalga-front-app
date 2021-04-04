<template>
  <ClubMeetingCreateAndEdit
    headerTitle="만남 만들기"
    :submitClickCallback="create"
    @back="$router.push(clubDetailPath())"
  />
</template>

<script lang="ts">
import ClubMeetingCreateAndEdit from '@/views/clubMeetingCreateAndEdit/ClubMeetingCreateAndEdit.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import Vue from 'vue';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { MeetingWriteRequest, MeetingWriteRequestWithSeq } from '@/interfaces/meeting';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubMeetingCreatePage',
  components: { ClubMeetingCreateAndEdit },
  mixins: [mixin],
  methods: {
    clubDetailPath() {
      return generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]);
    },
    create(meetingWriteRequest: MeetingWriteRequest) {
      const meetingWriteRequestWithSeq: MeetingWriteRequestWithSeq = {
        meetingWriteRequest: meetingWriteRequest,
        clubSeq: routerHelper.clubSeq(),
      };
      return this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_CREATE, meetingWriteRequestWithSeq)
        .then(() => {
          this.$router.push(generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]));
        });
    },
  },
});
</script>

<style scoped>

</style>
