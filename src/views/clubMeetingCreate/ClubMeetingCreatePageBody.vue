<template>
    <div class="club-meeting-create-page-body">
        <div class="wrapper">
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
                            outlined
                ></v-textarea>
                <v-select :items="maximumNumberList"
                          :rules="RULES.CLUB_MEETING_MAXIMUM_NUMBER"
                          class="px-10 pt-2"
                          label="만남 최대 인원"
                          @change="value => this.maximumNumber = value"
                />
            </v-form>
            <CommonCenterBtn :loading="loading"
                             class="mt-3"
                             color="primary"
                             outlined
                             text="만남 생성"
                             @click="click"
            />
        </div>
    </div>
</template>

<script>
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
import moment from 'moment';
import { MEETING_MAXIMUM_NUMBER_LIST, RULES } from '@/utils/common/constant/constant.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import { generateParamPath, PATH } from '@/router/route_path_type.js';

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

export default {
    name: 'ClubMeetingCreatePageBody',
    components: { DateTimePicker, CommonCenterBtn },
    data() {
        return {
            RULES,
            maximumNumberList: MEETING_MAXIMUM_NUMBER_LIST,
            loading: false,
            title: null,
            content: null,
            maximumNumber: null,
            startDateTime: { date: this.today(), time: '' },
            endDateTime: { date: this.today(), time: '' },
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
    methods: {
        today: () => moment().format('YYYY-MM-DD'),
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
                actionsHelper.requestMeetingCreate(this.buildRequestDto())
                    .then(() => this.$router.push(generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq())))
                    .finally(this.loading = false);
            }
        },
        buildRequestDto() {
            const clubMeetingCreateDto = {
                title: this.title,
                content: this.content,
                maximumNumber: this.maximumNumber,
                startTimestamp: toTimeStamp(this.startDateTime),
                endTimestamp: toTimeStamp(this.endDateTime),
            };
            return {
                clubMeetingCreateDto,
                clubSeq: routerHelper.clubSeq(),
            };
        },
    },
};
</script>

<style lang="scss"
       scoped
>
.wrapper {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
}
</style>
