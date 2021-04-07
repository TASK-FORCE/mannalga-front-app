<template>
  <div
    v-show="!$store.state.ui.loading"
    class="meeting"
  >
    <div class="meeting-header">
      <UserProfileAvatar
        :size="30"
        :name="creatorName"
        :appendNumber="appendNumber"
      />
      <div class="creator-name ml-2">
        {{ creatorName }}
      </div>
      <RoleTag
        v-if="isNotMember"
        :roleType="role"
        small
        class="ml-2 my-auto"
      />
    </div>
    <MiddleDivider :height="1" />
    <div class="meeting-body">
      <MeetingBox
        :meeting="meeting"
        large
      />
      <div class="content">
        {{ meeting.content }}
      </div>
      <v-row class="mt-1">
        <v-col>
          <v-btn
            v-if="meeting.regionURL"
            class="w-100 font-weight-bold application-btn"
            height="45"
            outlined
            @click="openUrl"
          >
            위치보기
          </v-btn>
          <v-btn
            v-else
            class="w-100 font-weight-bold disable-location-btn"
            height="45"
            disabled
          >
            위치 정보 없음
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            v-if="!meeting.isOpen"
            class="w-100 font-weight-bold"
            height="45"
            disabled
          >
            종료된 만남
          </v-btn>
          <v-btn
            v-else-if="meeting.isRegistered"
            class="w-100 font-weight-bold already-application-btn"
            height="45"
            @click="cancelMeetingDialog = true"
          >
            참여중
          </v-btn>
          <v-btn
            v-else
            class="w-100 font-weight-bold application-btn"
            height="45"
            outlined
            :loading="applicationBtnLoading"
            @click="applyMeetingApplication"
          >
            참여하기
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <YesOrNoDialog
      v-model="cancelMeetingDialog"
      title="만남 참여를 취소하시겠습니까?"
      cancelText="나가기"
      submitText="취소"
      :submitPromiseCallback="cancelMeetingApplication"
    />
    <MiddleDivider :height="5" />
    <div class="meeting-footer">
      <div class="meeting-application-users-title">
        참여자 ({{ numberInfoText }})
      </div>
      <div
        v-for="applicationUser in meeting.applicationUsers"
        :key="applicationUser.seq"
        class="mt-4"
      >
        <ClubMemberInfo
          :user="toClubUser(applicationUser)"
          :currentUserInfo="currentUserInfo"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import routerHelper from '@/router/RouterHelper.ts';
import MiddleDivider from '@/components/MiddleDivider.vue';
import Vue, { PropType } from 'vue';
import { isDarkTheme } from '@/utils/theme';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { Meeting, MeetingApplicationUser, MeetingSeqContext } from '@/interfaces/meeting';
import { ClubRole } from '@/utils/role';
import RoleTag from '@/components/tag/RoleTag.vue';
import MeetingBox from '@/components/meeting/MeetingBox.vue';
import ClubMemberInfo from '@/components/user/ClubMemberInfo.vue';
import { ClubUserInfo, CurrentUserInfo } from '@/interfaces/club';
import { generateParamPath, PATH } from '@/router/route_path_type';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';

export default Vue.extend({
  name: 'ClubMeetingPostBody',
  components: { YesOrNoDialog, ClubMemberInfo, MeetingBox, RoleTag, MiddleDivider, UserProfileAvatar },
  props: {
    meeting: {
      type: Object as PropType<Meeting>,
      required: true,
    },
  },
  data() {
    return {
      applicationBtnLoading: false,
      cancelMeetingDialog: false,
      isDarkTheme: isDarkTheme(),
    };
  },
  computed: {
    meetingSeqContext(): MeetingSeqContext {
      return {
        clubSeq: routerHelper.clubSeq(),
        meetingSeq: routerHelper.meetingSeq(),
      };
    },
    creatorName(): string {
      return this.meeting.registerUser.userName;
    },
    appendNumber(): number {
      if (this.meeting && this.meeting.registerUser) {
        return this.meeting.registerUser.seq;
      }
      return 0;
    },
    numberInfoText(): string {
      const registerNumber = this.meeting.applicationUsers.length.toString();
      if (this.meeting.maximumNumber) {
        return `${registerNumber}/${this.meeting.maximumNumber}`;
      }
      return registerNumber;
    },
    role(): string {
      return this.meeting.registerUserRoles[0]?.name || '';
    },
    isNotMember(): boolean {
      return this.role !== ClubRole.MEMBER;
    },
    currentUserInfo(): CurrentUserInfo {
      return this.$store.state.club.currentUserInfo;
    },
  },
  created() {
    this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING, this.meetingSeqContext)
      .catch((e) => routerHelper.pushWhenException(e, generateParamPath(PATH.CLUB.MAIN, [this.meetingSeqContext.clubSeq])));
  },
  methods: {
    applyMeetingApplication() {
      this.applicationBtnLoading = true;
      this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_APPLICATION, this.meetingSeqContext)
        .finally(() => (this.applicationBtnLoading = false));
    },
    cancelMeetingApplication() {
      return this.$store.dispatch(MeetingActionTypes.REQUEST_CANCEL_MEETING_APPLICATION, this.meetingSeqContext)
        .then(() => (this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CANCLE_MEETING_APPLICATION)));
    },
    toClubUser(meetingApplicationUser: MeetingApplicationUser): ClubUserInfo {
      return {
        clubUserSeq: 0,
        userSeq: meetingApplicationUser.seq,
        isLiked: false,
        role: meetingApplicationUser.roles.map(({ name }) => name),
        name: meetingApplicationUser.name,
        imgUrl: meetingApplicationUser.imgUrl,
      }
    },
    openUrl() {
      if (this.meeting.regionURL) {
        window.open(this.meeting.regionURL);
      }
    }
  },
});
</script>

<style
  scoped
  lang="scss"
>

.meeting {

  .meeting-header {
    display: flex;
    align-items: center;
    padding: 10px 20px;

    .creator-name {
      font-weight: bold;
      color: #292929;
    }

  }

  .meeting-body {
    padding: 25px 20px;

    .content {
      color: #292929;
      font-size: 16px;
    }

    .disable-location-btn {
      border: 1px solid #D4D4D4 !important;
      background: #FFFFFF !important;
    }

    .application-btn {
      border: 1px solid #D4D4D4;
      color: #666666;
    }

    .already-application-btn {
      background-color: #2883C6;
      color: #FFFFFF;
    }
  }

  .meeting-footer {
    padding: 15px 20px;

    .meeting-application-users-title {
      font-weight: bold;
      color: #292929;
      font-size: 18px;
    }
  }
}

.theme--dark {
  .meeting {
    .creator-name, .content, .meeting-application-users-title {
      color: #F5F5F5;
    }

    .disable-location-btn {
      background: #121212 !important;
      border: 1px solid #3c3c3c !important;
    }

    .application-btn {
      border: 1px solid #3c3c3c !important;
      color: #9f9f9f !important;
    }
  }
}
</style>
