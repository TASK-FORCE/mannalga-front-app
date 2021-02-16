<template>
    <div class="meeting-create-container">
        <v-form ref="clubMeetingCreateForm"
        >
            <v-text-field v-model="title"
                          :rules="RULES.CLUB_MEETING_TITLE"
                          class="pa-0"
                          label="만남 제목"
            />
            <DateTimePicker :dateTime="startDateTime"
                            :minDate="today()"
                            dateLabel="시작날짜"
                            timeLabel="시작시간"
                            @changeDateTime="changeStartDateTime"
            />
            <DateTimePicker :dateTime="endDateTime"
                            :minDate="this.startDateTime.date || today()"
                            :minTime="endDateMinTime"
                            dateLabel="종료날짜"
                            timeLabel="종료시간"
                            @changeDateTime="changeEndDateTime"
            />
            <v-textarea v-model="content"
                        :rules="RULES.EMPTY_RULE"
                        class="mt-2 club-meeting-create-page-body__content"
                        label="내용을 작성해주세요."
                        hide-details
                        outlined
            ></v-textarea>
            <div class="d-flex">
                <div class="d-flex">
                    <v-icon class="mr-2 mt-5"
                            style="padding: 2px;"
                            v-text="'$currencyKrw'"
                    />
                    <v-text-field v-model="cost"
                                  :rules="RULES.COST"
                                  label="비용"
                                  suffix="원"
                                  style="width: 100px"
                                  class="pr-5"
                                  @focus="costFocus"
                                  @focusout="costFocusout"
                    />
                </div>
                <v-text-field v-model="region"
                              label="만남 위치"
                              style="width: 150px"
                              class="pr-3"
                              prepend-icon="$mapMarker"
                />
            </div>
            <v-text-field v-model="maximumNumber"
                          :rules="RULES.CLUB_MEETING_MAXIMUM_NUMBER"
                          label="만남 최대 인원(빈값: 제한 없음)"
                          class="px-10"
                          prepend-icon="$twoPeople"
            />
        </v-form>
        <CommonCenterBtn :loading="loading"
                         class="mt-3"
                         color="primary"
                         outlined
                         :text="btnText"
                         @click="click"
        />
    </div>
</template>

<script>
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
import moment from 'moment';
import { toCurrency } from '@/utils/common/commonUtils.js';
import { RULES } from '@/utils/common/constant/rules.js';

const toMoment = (localDate) => moment(`${localDate.date} ${localDate.time}`.trim());
const toTimeStamp = (localDate) => `${localDate.date} ${localDate.time}:00`;
const isSameDate = (source, other) => {
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
const isAfter = (source, other) => {
    const sourceMoment = toMoment(source);
    const otherMoment = toMoment(other);
    return sourceMoment.isAfter(otherMoment);
};

const today = () => moment().format('YYYY-MM-DD');
const DEFAULT_DATE_TIME = { date: today(), time: '' };

export default {
    name: 'ClubMeetingCreateAndEditBody',
    components: { DateTimePicker, CommonCenterBtn },
    props: {
        btnText: {
            type: String,
            required: true,
        },
        /**
         * {
         *     title
         *     content
         *     maximumNumber
         *     cost
         *     region
         *     startDateTime
         *     endDateTime
         * }
         */
        context: {
            type: Object,
        },
        submitClickCallback: {
            type: Function, // (dto) => {} : Promise
            required: true,
        },
    },
    data() {
        return {
            RULES,
            loading: false,
            title: null,
            content: null,
            maximumNumber: null,
            cost: null,
            region: null,
            startDateTime: DEFAULT_DATE_TIME,
            endDateTime: DEFAULT_DATE_TIME,
        };
    },
    computed: {
        endDateMinTime() {
            if (isSameDate(this.startDateTime, this.endDateTime)) {
                return this.startDateTime.time;
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
            this.startDateTime = this.context.startDateTime;
            this.endDateTime = this.context.endDateTime;
        }
    },
    methods: {
        today,
        changeStartDateTime(dateTime) {
            this.startDateTime = dateTime;
            this.recalculateEndDateTime();
        },
        changeEndDateTime(dateTime) {
            this.endDateTime = dateTime;
            this.recalculateEndDateTime();
        },
        recalculateEndDateTime() {
            if (isAfter(this.startDateTime, this.endDateTime)) {
                if (isSameDate(this.startDateTime, this.endDateTime)) {
                    this.endDateTime = { date: this.endDateTime.date, time: '' };
                } else {
                    this.endDateTime = { date: '', time: '' };
                }
            }
        },
        click() {
            if (this.$refs.clubMeetingCreateForm.validate()) {
                this.loading = true;
                const meetingDto = {
                    title: this.title,
                    content: this.content,
                    maximumNumber: this.maximumNumber,
                    startTimestamp: toTimeStamp(this.startDateTime),
                    endTimestamp: toTimeStamp(this.endDateTime),
                    cost: this.cost ? toNumber(this.cost) : this.cost,
                    region: this.region,
                };
                this.submitClickCallback(meetingDto).finally(this.loading = false);
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
    },
};

function toNumber(value) {
    if (typeof value === 'string') {
        return value.replaceAll(',', '');
    }
    return value;
}
</script>

<style lang="scss"
       scoped
>
.meeting-create-container {
    padding-top: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
}
</style>
