<template>
    <div>
        <div class="pb-2 p-relative">
            <div v-show="meeting.isCreator"
                 class="my-meeting-flag"
            >
                <div class="my-meeting-text">내<br />만<br />남</div>
            </div>
            <v-list-item class="pa-0 p-relative">
                <div v-ripple
                     class="flex-grow-1"
                     @click="goToMeetingDetailPage"
                >
                    <div class="px-2 pt-3 pb-1">
                        <MeetingTimeRange :startTime="meeting.startTime"
                                          :endTime="meeting.endTime"
                        />
                        <div class="text-center py-2">{{ meeting.title }}</div>
                        <div class="d-flex px-3">
                        <span class="f-07 flex-grow-1">
                            <v-icon small>mdi-cash-usd</v-icon>
                            미정
                        </span>
                            <span class="f-07 flex-grow-1">
                            <v-icon small>mdi-map-marker</v-icon>
                            미정
                        </span>
                            <span class="f-07">
                           <v-icon small>mdi-account-multiple</v-icon>
                            1/{{ meeting.maximumNumber }}
                        </span>
                        </div>
                    </div>
                </div>
                <div class="pr-2">
                    <div class="p-relative">
                        <v-btn :loading="applyLoading"
                               outlined
                               class="pa-0"
                               width="60"
                               :height="meeting.isRegistered ? 40 : 60"
                               color="#3f51b5"
                               :disabled="meeting.isRegistered"
                               @click="applyMeeting"
                        >
                    <span v-if="meeting.isRegistered"
                          class="register-success-text"
                    >
                        신청완료
                    </span>
                            <span v-else>만남<br />신청</span>
                        </v-btn>
                    </div>
                    <v-chip v-show="meeting.isRegistered"
                            outlined
                            x-small
                            class="font-weight-bold py-2 f-07 mt-3"
                            color="#e91e63"
                            @click="$emit('openCancelDialog')"
                    >
                        신청 취소
                    </v-chip>
                </div>
            </v-list-item>
        </div>
        <v-divider />
    </div>
</template>

<script>

import MeetingTimeRange from '@/components/meeting/MeetingTimeRange.vue';
import routerParamHelper from '@/router/RouterParamHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import { generateParamPath, PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubDetailMeetingPost',
    components: { MeetingTimeRange },
    props: {
        meeting: Object,
    },
    data() {
        return {
            applyLoading: false,
        };
    },
    computed: {
        clubSeq: () => routerParamHelper.clubSeq(),
    },
    methods: {
        applyMeeting() {
            this.applyLoading = true;
            const meetingApplicationInfo = {
                clubSeq: this.clubSeq,
                meetingSeq: this.meeting.seq,
            };
            actionsHelper.requestMeetingApplication(meetingApplicationInfo)
                .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_APPLY_MEETING))
                .finally(() => (this.applyLoading = false));
        },
        goToMeetingDetailPage() {
            mutationsHelper.setMeeting(this.meeting);
            this.$router.push(generateParamPath(PATH.CLUB.MEETING_POST, [this.clubSeq, this.meeting.seq]));
        },
    },
};

</script>

<style scoped
       lang="scss"
>
.register-success-text {
    font-size: 0.8rem;
    font-weight: bold;
    color: #2196f3;
}

.my-meeting-flag {
    position: absolute;
    height: 100%;
    width: 15px;
    background-color: #46a046;

    .my-meeting-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 0.7rem;
        font-weight: bold;
    }
}
</style>
