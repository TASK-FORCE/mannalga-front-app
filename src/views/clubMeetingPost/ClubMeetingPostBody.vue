<template>
  <div v-show="!$store.state.ui.loading">
    <div class="d-flex pa-3">
      <UserProfileAvatar
        :size="50"
        :name="creatorName"
        :appendNumber="appendNumber"
      />
      <div class="ml-2">
        <div class="meeting-title">{{ meeting.title }}</div>
        <div class="meeting-subtitle">
          {{ creatorName }}
          <span
            v-if="meeting.isCreator"
            class="my-meeting-tag"
          >
                        내만남
                    </span>
        </div>
      </div>
      <v-spacer />
      <v-btn
        v-if="meeting.isCreator"
        outlined
        small
        class="my-auto"
        @click="moveToMeetingEditPage"
      >
        수정
      </v-btn>
    </div>
    <div class="pa-1">
      <MeetingTimeRange
        :startTime="meeting.startTimestamp"
        :endTime="meeting.endTimestamp"
        large
      />
      <div class="mt-3 px-2 f-09">
        {{ meeting.content }}
      </div>
    </div>
    <div class="px-3">
      <div class="d-flex px-3 justify-center">
        <div class="f-09">
          <v-icon
            style="padding: 2px"
            color="green"
            v-text="'$currencyKrw'"
          />
          {{ meeting.cost ? meeting.cost : '미정' }}
        </div>
        <div class="f-09 ml-5">
          <v-icon
            color="blue"
            v-text="'$mapMarker'"
          />
          {{ meeting.region ? meeting.region : '미정' }}
        </div>
      </div>
    </div>
    <MiddleDivider class="mt-2" />
    <div class="meeting-users-box">
      <div class="d-flex px-2 pt-2">
        <div class="meeting-users-title my-auto">
          <v-icon
            color="#ff9800"
            large
            v-text="'$twoPeople'"
          />
          모임 신청 현황
          ({{ numberInfoText }})
        </div>
        <v-spacer />
        <div v-if="meeting.isOpen">
          <v-btn
            v-if="!meeting.isRegistered"
            :loading="applicationBtnLoading"
            class="mt-auto"
            color="#3f51b5"
            outlined
            @click="applyMeetingApplication"
          >
            모임 신청
          </v-btn>
          <v-btn
            v-else
            class="mt-auto"
            color="#e91e63"
            outlined
            @click="cancelMeetingApplication"
          >
            신청 취소
          </v-btn>
        </div>
      </div>
      <SimpleUserProfileList :users="meeting.applicationUsers" />
    </div>
  </div>
</template>

<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import MeetingTimeRange from '@/components/meeting/MeetingTimeRange.vue';
import routerHelper from '@/router/RouterHelper.ts';
import MiddleDivider from '@/components/MiddleDivider.vue';
import SimpleUserProfileList from '@/components/user/SimpleUserProfileList.vue';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue from 'vue';
import { isDarkTheme } from '@/utils/theme';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { Meeting, MeetingSeqContext } from '@/interfaces/meeting';

export default Vue.extend({
  name: 'ClubMeetingPostBody',
  components: { SimpleUserProfileList, MiddleDivider, MeetingTimeRange, UserProfileAvatar },
  data() {
    return {
      applicationBtnLoading: false,
      isDarkTheme: isDarkTheme(),
    };
  },
  computed: {
    meeting(): Meeting {
      return this.$store.state.meeting.meeting;
    },
    meetingSeqContext(): MeetingSeqContext {
      return {
        clubSeq: routerHelper.clubSeq(),
        meetingSeq: routerHelper.meetingSeq(),
      };
    },
    creatorName() {
      if (this.meeting && this.meeting.registerUser) {
        return this.meeting.registerUser.userName;
      }
      return '';
    },
    appendNumber() {
      if (this.meeting && this.meeting.registerUser) {
        return this.meeting.registerUser.seq;
      }
      return 0;
    },
    numberInfoText() {
      const registerNumber = this.meeting.applicationUsers.length.toString();
      if (this.meeting.maximumNumber) {
        return `${registerNumber}/${this.meeting.maximumNumber}`;
      }
      return registerNumber;
    }
  },
  created() {
    this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING, this.meetingSeqContext)
      .catch(() => this.$router.back());
  },
  methods: {
    applyMeetingApplication() {
      this.applicationBtnLoading = true;
      this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_APPLICATION, this.meetingSeqContext)
        .then(() => this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_APPLY_MEETING_APPLICATION))
        .finally(() => (this.applicationBtnLoading = false));
    },
    cancelMeetingApplication() {
      this.applicationBtnLoading = true;
      this.$store.dispatch(MeetingActionTypes.REQUEST_CANCEL_MEETING_APPLICATION, this.meetingSeqContext)
        .then(() => this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CANCEL_MEETING_APPLICATION))
        .finally(() => (this.applicationBtnLoading = false));
    },
    moveToMeetingEditPage() {
      const { clubSeq, meetingSeq } = this.meetingSeqContext;
      this.$router.push(generateParamPath(PATH.CLUB.MEETING_EDIT, [clubSeq, meetingSeq]));
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.meeting-title {
  font-weight: 700;
  font-size: 1.05rem;
}

.meeting-subtitle {
  font-size: 0.9rem;
}

.my-meeting-tag {
  background-color: #46a046;
  color: white;
  padding: 4px;
  font-size: 0.7rem;
  font-weight: bold;
}

.meeting-users-box {
  margin: 4px;

  .meeting-users-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
