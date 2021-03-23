<template>
  <div>
    <CommonHeader
      title="만남 수정"
      @back="$router.push(clubDetailPath())"
    />
    <ClubMeetingCreateAndEditBody
      btnText="만남 수정"
      :context="editContext"
      :submitClickCallback="edit"
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
import { Meeting, MeetingWriteContext, MeetingWriteRequest, MeetingWriteRequestWithSeq } from '@/interfaces/meeting';

export default Vue.extend({
  name: 'ClubMeetingEditPage',
  components: { ClubMeetingCreateAndEditBody, CommonHeader },
  computed: {
    meeting(): Meeting {
      return this.$store.state.meeting.meeting;
    },
    editContext(): MeetingWriteContext {
      if (this.meeting.seq === 0) {
        this.$router.back();
      }
      const startDateTimeToken = this.meeting.startTimestamp.split(' ');
      const endDateTimeToken = this.meeting.endTimestamp.split(' ');
      return {
        title: this.meeting.title,
        content: this.meeting.content,
        maximumNumber: this.meeting.maximumNumber,
        cost: this.meeting.cost,
        region: this.meeting.region,
        startDateTime: { date: startDateTimeToken[0], time: startDateTimeToken[1].substring(0, 5) },
        endDateTime: { date: endDateTimeToken[0], time: endDateTimeToken[1].substring(0, 5) },
      };
    },
  },
  methods: {
    clubDetailPath() {
      return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
    },
    edit(meetingWriteRequest: MeetingWriteRequest) {
      const clubSeq = routerHelper.clubSeq();
      const meetingSeq = routerHelper.meetingSeq();
      const meetingWriteRequestWithSeq: MeetingWriteRequestWithSeq = {
        meetingWriteRequest: meetingWriteRequest,
        clubSeq: clubSeq,
        meetingSeq: meetingSeq,
      };
      return this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_EDIT, meetingWriteRequestWithSeq)
        .then(() => {
          this.$store.dispatch(MeetingActionTypes.REQUEST_FIRST_MEETING_GROUP_LIST, meetingWriteRequestWithSeq.clubSeq);
          this.$router.push(generateParamPath(PATH.CLUB.MEETING_POST, [clubSeq, meetingSeq]));
        });
    },
  },
});
</script>

<style scoped>

</style>
