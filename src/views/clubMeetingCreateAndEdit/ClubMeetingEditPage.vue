<template>
  <ClubMeetingCreateAndEdit
    headerTitle="만남 수정"
    :context="editContext"
    :submitClickCallback="edit"
    @back="$router.push(meetingPostPagePath())"
  />
</template>

<script lang="ts">
import ClubMeetingCreateAndEdit from '@/views/clubMeetingCreateAndEdit/ClubMeetingCreateAndEdit.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import Vue from 'vue';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { Meeting, MeetingWriteContext, MeetingWriteRequest, MeetingWriteRequestWithSeq } from '@/interfaces/meeting';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubMeetingEditPage',
  components: { ClubMeetingCreateAndEdit },
  mixins: [mixin],
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
        regionURL: this.meeting.regionURL,
        startDateTime: { date: startDateTimeToken[0], time: startDateTimeToken[1].substring(0, 5) },
        endDateTime: { date: endDateTimeToken[0], time: endDateTimeToken[1].substring(0, 5) },
      };
    },
  },
  methods: {
    meetingPostPagePath() {
      return generateParamPath(PATH.CLUB.MEETING_POST, [routerHelper.clubSeq(), routerHelper.meetingSeq()]);
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
          this.$router.push(this.meetingPostPagePath());
        });
    },
  },
});
</script>

<style scoped>

</style>
