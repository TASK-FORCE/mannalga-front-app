<template>
  <div>
    <SubmitHeader
      :title="headerTitle"
      :submitCallback="submit"
      @back="$emit('back')"
    />
    <v-form
      ref="clubMeetingCreateForm"
      class="meeting-create-and-edit-form"
    >
      <v-text-field
        v-model="title"
        :rules="RULES.CLUB_MEETING_TITLE"
        hide-details
        outlined
        label="만남 제목"
      />
      <DateTimePicker
        :dateTime="startDateTime"
        :minDate="today()"
        dateLabel="시작날짜"
        timeLabel="시작시간"
        @changeDateTime="changeStartDateTime"
      />
      <DateTimePicker
        :dateTime="endDateTime"
        :minDate="this.startDateTime.date || today()"
        :minTime="endDateMinTime"
        dateLabel="종료날짜"
        timeLabel="종료시간"
        @changeDateTime="changeEndDateTime"
      />
      <v-row class="mx-0 mt-1">
        <v-col class="pr-3 pl-0">
          <v-text-field
            v-model="cost"
            :rules="RULES.COST"
            hide-details
            outlined
            label="비용"
            @focus="costFocus"
            @focusout="costFocusout"
          />
        </v-col>
        <v-col class="px-0">
          <v-text-field
            v-model="maximumNumber"
            :rules="RULES.CLUB_MEETING_MAXIMUM_NUMBER"
            label="만남 최대 인원"
            hide-details
            outlined
          />
        </v-col>
      </v-row>
      <v-row class="mx-0 mt-1">
        <v-col class="px-0">
          <v-text-field
            label="만남 위치 정보"
            hide-details
            outlined
            readonly
            :value="region"
            @click="regionSearchDialog = true"
          />
        </v-col>
      </v-row>
      <v-textarea
        v-model="content"
        :rules="RULES.EMPTY_RULE"
        class="mt-4"
        label="만남 내용"
        hide-details
        outlined
      ></v-textarea>
    </v-form>
    <RegionSearchDialog
      v-model="regionSearchDialog"
      @select="selectRegion"
    />
  </div>
</template>

<script lang="ts">
import DateTimePicker from '@/components/DateTimePicker.vue';
import moment from 'moment';
import { toCurrency } from '@/utils/common/commonUtils.ts';
import { RULES } from '@/utils/common/constant/rules.ts';
import Vue, { PropType } from 'vue';
import { DateTime, MeetingWriteContext, MeetingWriteRequest } from '@/interfaces/meeting';
import SubmitHeader from '@/components/header/SubmitHeader.vue';
import RegionSearchDialog from '@/views/clubMeetingCreateAndEdit/RegionSearchDialog.vue';
import { KakaoMapSearchDocs } from '@/utils/kakao/map/search';

const toMoment = (localDate: DateTime): moment.Moment => moment(`${localDate.date} ${localDate.time}`.trim());
const toTimeStamp = (localDate: DateTime): string => `${localDate.date} ${localDate.time}:00`;
const isSameDate = (source: DateTime, other: DateTime) => {
  const sourceMoment = toMoment(source);
  const otherMoment = toMoment(other);
  if (sourceMoment.year() === otherMoment.year()) {
    if (sourceMoment.month() === otherMoment.month()) {
      if (sourceMoment.dayOfYear() === otherMoment.dayOfYear()) {
        return true;
      }
    }
  }
  return false;
};
const isAfter = (source: DateTime, other: DateTime) => {
  const sourceMoment = toMoment(source);
  const otherMoment = toMoment(other);
  return sourceMoment.isAfter(otherMoment);
};

const today = () => moment().format('YYYY-MM-DD');
const DEFAULT_DATE_TIME: DateTime = { date: today(), time: '' };

export default Vue.extend({
  name: 'ClubMeetingCreateAndEdit',
  components: { RegionSearchDialog, SubmitHeader, DateTimePicker },
  props: {
    headerTitle: {
      type: String,
      required: true,
    },
    context: {
      type: Object as PropType<MeetingWriteContext>,
    },
    submitClickCallback: {
      type: Function as PropType<(meetingWriteRequest: MeetingWriteRequest) => Promise<void>>,
      required: true,
    },
  },
  data() {
    return {
      RULES,
      title: '' as string,
      content: '' as string,
      maximumNumber: undefined as number | undefined,
      cost: undefined as string | undefined,
      region: undefined as string | undefined,
      regionURL: undefined as string | undefined,
      startDateTime: DEFAULT_DATE_TIME as DateTime,
      endDateTime: DEFAULT_DATE_TIME as DateTime,
      regionSearchDialog: false,
    };
  },
  computed: {
    endDateMinTime(): string | undefined {
      if (isSameDate(this.startDateTime, this.endDateTime)) {
        return this.startDateTime.time
      }
      return '';
    },
  },
  mounted() {
    if (this.context) {
      this.title = this.context.title;
      this.content = this.context.content;
      this.maximumNumber = this.context.maximumNumber;
      this.cost = this.context.cost;
      this.region = this.context.region;
      this.regionURL = this.context.region;
      this.startDateTime = this.context.startDateTime;
      this.endDateTime = this.context.endDateTime;
    }
  },
  methods: {
    today,
    changeStartDateTime(dateTime: any) {
      this.startDateTime = dateTime;
      this.recalculateEndDateTime();
    },
    changeEndDateTime(dateTime: any) {
      this.endDateTime = dateTime;
      this.recalculateEndDateTime();
    },
    recalculateEndDateTime(): void {
      if (isAfter(this.startDateTime, this.endDateTime)) {
        if (isSameDate(this.startDateTime, this.endDateTime)) {
          this.endDateTime = { date: this.endDateTime.date, time: '' };
        } else {
          this.endDateTime = { date: '', time: '' };
        }
      }
    },
    submit() {
      const clubMeetingCreateForm = this.$refs.clubMeetingCreateForm as HTMLFormElement;
      if (clubMeetingCreateForm.validate()) {
        const meetingDto: MeetingWriteRequest = {
          title: this.title,
          content: this.content,
          maximumNumber: this.maximumNumber,
          startTimestamp: toTimeStamp(this.startDateTime),
          endTimestamp: toTimeStamp(this.endDateTime),
          cost: this.cost ? toNumber(this.cost) : this.cost,
          region: this.region,
          regionURL: this.regionURL
        };
        return this.submitClickCallback(meetingDto);
      }
    },
    costFocus() {
      if (this.cost) {
        this.cost = toNumber(this.cost);
      }
    },
    costFocusout() {
      if (this.cost) {
        this.cost = toCurrency(toNumber(this.cost));
      }
    },
    selectRegion(selectedRegion: KakaoMapSearchDocs) {
      this.region = selectedRegion.place_name;
      this.regionURL = selectedRegion.place_url;
    },
  },
});

function toNumber(value: any) {
  if (typeof value === 'string') {
    return value.replaceAll(',', '');
  }
  return value;
}
</script>

<style
  lang="scss"
  scoped
>
.meeting-create-and-edit-form {
  padding-top: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
