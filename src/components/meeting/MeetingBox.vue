<template>
  <div
    class="meeting-box"
    :class="large ? 'large' : ''"
  >
    <div class="d-flex align-center">
      <div class="meeting-title">
        {{ meeting.title }}
      </div>
      <v-spacer />
      <div
        v-if="showTag && tagText"
        class="meeting-tag"
      >
        {{ tagText }}
      </div>
    </div>
    <div class="sub-description-wrapper">
      <div class="sub-description">
        <v-icon
          :size="large ? 16 : 12"
          class="sub-description-icon"
          v-text="'$clock'"
        />
        {{ meetingTime }}
      </div>
      <div class="sub-description pt-1">
        <v-icon
          :size="large ? 16 : 12"
          class="sub-description-icon"
          v-text="'$mapMarker'"
        />
        {{ meeting.region ? meeting.region : '미정' }}
      </div>
      <div class="sub-description pt-1">
        <v-icon
          :size="large ? 16 : 12"
          class="sub-description-icon"
          v-text="'$currencyKrw'"
        />
        {{ meeting.cost ? meeting.cost : '미정' }}
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Meeting, MeetingFeed } from '@/interfaces/meeting';

export default Vue.extend({
  name: 'MeetingBox',
  props: {
    meeting: {
      type: Object as PropType<MeetingFeed | Meeting>,
      required: true,
    },
    showTag: {
      type: Boolean,
      required: false,
    },
    large: {
      type: Boolean,
      required: false,
    }
  },
  computed: {
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
  },
});
</script>

<style
  scoped
  lang="scss"
>
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
}

.large {
  .sub-description {
    font-size: 14px !important;
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
