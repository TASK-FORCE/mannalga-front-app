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
                <v-text-field v-model="cost"
                              :rules="RULES.COST"
                              label="비용"
                              prepend-icon="mdi-cash-usd"
                              class="pr-3"
                              @focus="costFocus"
                              @focusout="costFocusout"
                />
                <v-text-field v-model="region"
                              label="만남 위치"
                              prepend-icon="mdi-map-marker"
                              class="pr-3"
                />
            </div>
            <v-text-field v-model="maximumNumber"
                          :rules="RULES.CLUB_MEETING_MAXIMUM_NUMBER"
                          label="만남 최대 인원(빈값: 제한 없음)"
                          class="px-10"
                          prepend-icon="mdi-account-group"
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
</template>

<script>
import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import DateTimePicker from '@/components/DateTimePicker.vue';
import moment from 'moment';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import routerHelper from '@/router/RouterHelper.js';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
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

export default {
    name: 'ClubMeetingCreatePageBody',
    components: { DateTimePicker, CommonCenterBtn },
    data() {
        return {
            RULES,
            loading: false,
            title: null,
            content: null,
            maximumNumber: null,
            cost: null,
            region: null,
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
                const clubMeetingCreateInfo = {
                    clubMeetingCreateDto: {
                        title: this.title,
                        content: this.content,
                        maximumNumber: this.maximumNumber,
                        startTimestamp: toTimeStamp(this.startDateTime),
                        endTimestamp: toTimeStamp(this.endDateTime),
                        cost: this.cost ? toNumber(this.cost) : this.cost,
                        region: this.region,
                    },
                    clubSeq: routerHelper.clubSeq(),
                };
                actionsHelper.requestMeetingCreate(clubMeetingCreateInfo)
                    .then(() => {
                        actionsHelper.requestFirstMeetingList(clubMeetingCreateInfo.clubSeq);
                        this.$router.push(generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq()));
                    })
                    .finally(this.loading = false);
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
