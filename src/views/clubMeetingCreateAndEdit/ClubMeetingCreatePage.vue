<template>
  <ClubMeetingCreateAndEdit
    headerTitle="만남 만들기"
    :submitClickCallback="create"
    @back="moveToClubMainPage"
  />
</template>

<script lang="ts">
import ClubMeetingCreateAndEdit from '@/views/clubMeetingCreateAndEdit/ClubMeetingCreateAndEdit.vue';
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
    moveToClubMainPage() {
      routerHelper.moveToClubMainPage();
    },
    create(meetingWriteRequest: MeetingWriteRequest) {
      const meetingWriteRequestWithSeq: MeetingWriteRequestWithSeq = {
        meetingWriteRequest: meetingWriteRequest,
        clubSeq: routerHelper.clubSeq(),
      };
      return this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_CREATE, meetingWriteRequestWithSeq)
        .then(() => this.moveToClubMainPage());
    },
  },
});
</script>

<style scoped>

</style>
