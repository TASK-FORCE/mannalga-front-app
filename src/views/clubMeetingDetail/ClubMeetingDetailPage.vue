<template>
  <div>
    <MenuHeader
      title="만남"
      :menus="menus"
      @back="$router.push(clubDetailPath())"
    />
    <ClubMeetingDetailBody :meeting="meeting" />
    <YesOrNoDialog
      v-model="deleteDialog"
      title="만남을 정말 삭제하시겠습니까?"
      submitText="삭제"
      :submitPromiseCallback="deleteMeeting"
    />
  </div>
</template>

<script lang="ts">
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import ClubMeetingDetailBody from '@/views/clubMeetingDetail/ClubMeetingDetailBody.vue';
import Vue from 'vue';
import MenuHeader from '@/components/header/MenuHeader.vue';
import { ClickWithText } from '@/interfaces/common';
import { Meeting } from '@/interfaces/meeting';
import { CurrentUserInfo } from '@/interfaces/club';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { MESSAGE } from '@/utils/common/constant/messages';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubMeetingPostPage',
  components: { YesOrNoDialog, MenuHeader, ClubMeetingDetailBody },
  mixins: [mixin],
  data() {
    return {
      deleteDialog: false,
    };
  },
  computed: {
    meeting(): Meeting {
      return this.$store.state.meeting.meeting;
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
    editMenu(): ClickWithText {
      return {
        text: '수정',
        click: this.moveToMeetingEditPage
      }
    },
    deleteMenu(): ClickWithText {
      return {
        text: '삭제',
        click: this.openDeleteDialog
      }
    },
    menus(): ClickWithText[] {
      if (this.meeting.isCreator) {
        return [this.editMenu, this.deleteMenu];
      }

      if (this.currentUserInfo.isMaster || this.currentUserInfo.isManager) {
        return [this.deleteMenu];
      }
      return [];
    }
  },
  methods: {
    clubDetailPath() {
      return generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]);
    },
    moveToMeetingEditPage() {
      this.$router.push(generateParamPath(PATH.CLUB.MEETING_EDIT, [routerHelper.clubSeq(), routerHelper.meetingSeq()]));
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    deleteMeeting() {
      return this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_DELETE, {
        clubSeq: routerHelper.clubSeq(),
        meetingSeq: routerHelper.meetingSeq()
      })
        .then(() => {
          this.moveToClubDetailPage();
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_DELETE_MEETING);
        })
    },
    moveToClubDetailPage() {
      this.$router.push(generateParamPath(PATH.CLUB.MAIN, [routerHelper.clubSeq()]))
    }
  },
});
</script>

<style scoped>

</style>
