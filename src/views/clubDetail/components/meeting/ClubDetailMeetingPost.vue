<template>
  <div
    v-ripple
    class="d-flex"
    :class="resolveClass"
    @click="goToMeetingDetailPage"
  >
    <div class="meeting-day-info">
      <div class="meeting-day">
        {{ meeting.meetingDay }}
      </div>
      <div class="meeting-day-of-week">
        {{ meeting.meetingDayOfWeek }}
      </div>
    </div>
    <div class="divider" />
    <MeetingBox
      :meeting="meeting"
      showTag
    >
      <template #footer>
        <div class="d-flex align-center">
          <div
            v-for="(user, index) in extractedApplicationUsers"
            :key="user.seq"
          >
            <UserProfileAvatar
              :size="22"
              :name="user.name"
              :appendNumber="user.seq"
              :imgUrl="user.imgUrl"
              :class="index !== 0 ? 'ml-1' : null"
            />
          </div>
          <div v-if="remainingApplicationUserCount > 0">
            <TextAvatar
              :size="22"
              :name="`+${remainingApplicationUserCount}`"
              class="ml-1"
            />
          </div>
          <v-spacer />
          <div class="meeting-application-users-number">
            <div>
              <v-icon
                size="12"
                class="users-number-icon"
                v-text="'$twoPeople'"
              />
            </div>
            <div>
              {{ meeting.applicationUsers.length }}
              <span v-if="meeting.maximumNumber">/ {{ meeting.maximumNumber }}</span>
            </div>
          </div>
        </div>
      </template>
    </MeetingBox>
  </div>
</template>

<script lang="ts">

import routerHelper from '@/router/RouterHelper.ts';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import TextAvatar from '@/components/user/TextAvatar.vue';
import Vue, { PropType } from 'vue';
import { MeetingApplicationUser, MeetingFeed } from '@/interfaces/meeting';
import MeetingBox from '@/components/meeting/MeetingBox.vue';

const SHOW_AVATAR_SIZE = 5;

export default Vue.extend({
  name: 'ClubDetailMeetingPost',
  components: { MeetingBox, TextAvatar, UserProfileAvatar },
  props: {
    meeting: Object as PropType<MeetingFeed>,
  },
  computed: {
    clubSeq(): number {
      return routerHelper.clubSeq();
    },
    resolveClass(): any {
      if (!this.meeting.isOpen) {
        return 'close-meeting';
      }

      if (this.meeting.isRegistered) {
        return 'application-meeting';
      }
      return null;
    },
    tagText(): string | null {
      if (!this.meeting.isOpen) {
        return '종료';
      }

      if (this.meeting.isCreator) {
        return 'MY';
      }
      return null;
    },
    meetingTime(): string {
      const { isSameDayMeeting, startDate, startTime, endDate, endTime } = this.meeting;
      if (isSameDayMeeting) {
        return `${startDate} ${startTime} - ${endTime}`;
      }

      return `${startDate} - ${endDate}`;
    },
    extractedApplicationUsers(): MeetingApplicationUser[] {
      return this.meeting.applicationUsers.slice(0, SHOW_AVATAR_SIZE);
    },
    remainingApplicationUserCount(): number {
      return this.meeting.applicationUsers.length - SHOW_AVATAR_SIZE;
    },
  },
  methods: {
    goToMeetingDetailPage() {
      this.$router.push(generateParamPath(PATH.CLUB.MEETING_POST, [this.clubSeq, this.meeting.seq]));
    },
  },
});

</script>

<style
  scoped
  lang="scss"
>
.meeting-day-info {
  width: 55px !important;
  text-align: center;

  .meeting-day {
    font-weight: 500;
    font-size: 33px;
  }

  .meeting-day-of-week {
    font-weight: 500;
    font-size: 14px;
    color: #666666;
  }
}

.divider {
  border-left: #FAF9F9 solid 2px;
  margin: 0 16px;
}

.meeting-box {
  width: 100%;
  background: #F5F5F5;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .meeting-title {
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .meeting-tag {
    width: 35px;
    height: 20px;
    border: 1.5px solid #666666;
    border-radius: 5px;
    font-size: 10px;
    text-align: center;
    font-weight: 700;
  }

  .sub-description-wrapper {
    padding: 8px 0;

    .sub-description {
      color: #666666;
      font-size: 11px;
      font-weight: 500;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .sub-description-icon {
        margin-right: 5px;
        width: 12px;
        height: 10px
      }
    }
  }

  .meeting-application-users-number {
    display: flex;
    align-content: center;
    font-weight: 700;
    color: #666666;
    font-size: 11px;

    .users-number-icon {
      width: 9px;
      height: 11px;
      margin-right: 3px;
    }

  }
}

.last-child {
  .meeting-box {
    margin-bottom: 0;
  }
}

.theme--dark {
  .meeting-day-of-week {
    color: #9f9f9f;
  }

  .divider {
    border-color: #292929;
  }

  .meeting-box {
    background: #292929;

    .meeting-title, {
      color: white;
    }

    .meeting-tag, .sub-description, .meeting-application-users-number, .sub-description-icon, .users-number-icon {
      color: #9f9f9f;
    }

    .meeting-tag {
      border-color: white;
    }
  }

  .close-meeting {
    .meeting-day, .meeting-day-of-week {
      color: #3c3c3c !important;
    }

    .meeting-box {
      background: #3c3c3c !important;
    }

    .meeting-title, .meeting-tag, .sub-description, .meeting-application-users-number, .sub-description-icon, .users-number-icon {
      color: #666666 !important;
    }

    .meeting-tag {
      border-color: #666666 !important;
    }
  }
}

.application-meeting {
  .meeting-box {
    background: #2883C6;
  }

  .meeting-title, .meeting-tag, .sub-description, .meeting-application-users-number, .sub-description-icon, .users-number-icon {
    color: white !important;
  }

  .meeting-tag {
    border-color: white;
  }
}

.close-meeting {
  .meeting-day, .meeting-day-of-week {
    color: #D4D4D4 !important;
  }

  .meeting-box {
    background: #D5D5D5 !important;
  }

  .meeting-title, .meeting-tag, .sub-description, .meeting-application-users-number, .sub-description-icon, .users-number-icon {
    color: #9F9F9F !important;
  }

  .meeting-tag {
    border-color: #9F9F9F !important;
  }
}
</style>
