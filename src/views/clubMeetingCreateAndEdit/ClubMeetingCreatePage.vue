<template>
  <div>
    <CommonHeader
      title="만남 생성"
      @back="$router.push(clubDetailPath())"
    />
    <ClubMeetingCreateAndEditBody
      btnText="만남 생성"
      :submitClickCallback="create"
    />
  </div>
</template>

<script lang="ts">
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubMeetingCreateAndEditBody from '@/views/clubMeetingCreateAndEdit/ClubMeetingCreateAndEditBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import Vue from 'vue';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { MeetingWriteRequest, MeetingWriteRequestWithSeq } from '@/interfaces/meeting';

export default Vue.extend({
  name: 'ClubMeetingCreatePage',
  components: { ClubMeetingCreateAndEditBody, CommonHeader },
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
          this.$store.dispatch(MeetingActionTypes.REQUEST_FIRST_MEETING_GROUP_LIST, meetingWriteRequestWithSeq.clubSeq);
          this.$router.push(generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]));
        });
    },
  },
});
</script>

<style scoped>

</style>
