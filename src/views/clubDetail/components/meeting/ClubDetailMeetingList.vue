<template>
    <div>
        <InfiniteScrollTemplate name="meeting"
                                :firstPageCallback="this.fetchFirstPage"
                                :nextPageCallback="this.fetchNextPage"
                                :pageElements="meetingList"
                                :pageInfo="meetingPage"
                                :withListGroup="false"
        >
            <template v-slot:list-main>
                <div v-for="meeting in meetingList"
                     :key="meeting.seq"
                >
                    <ClubDetailMeetingPost :meeting="meeting"
                                           @openCancelDialog="openCancelDialog(meeting)"
                                           @openRegisterDialog="openRegisterDialog(meeting)"
                    />
                </div>
            </template>
        </InfiniteScrollTemplate>
        <YesOrNoDialog v-model="showRegisterDialog"
                       title="만남을 신청하시겠습니까?"
                       :submitPromiseCallback="registerMeeting"
        >
            <template #description>
                <div class="mb-2">
                    만남명: {{ registerTargetMeeting.title }}
                </div>
                <MeetingTimeRange :startTime="registerTargetMeeting.startTime"
                                  :endTime="registerTargetMeeting.endTime"
                />
            </template>
        </YesOrNoDialog>
        <YesOrNoDialog v-model="showCancelDialog"
                       title="만남 신청을 취소하시겠습니까?"
                       :submitPromiseCallback="cancelMeeting"
        >
            <template #description>
                <div class="mb-2">
                    만남명: {{ cancelTargetMeeting.title }}
                </div>
                <MeetingTimeRange :startTime="cancelTargetMeeting.startTime"
                                  :endTime="cancelTargetMeeting.endTime"
                />
            </template>
        </YesOrNoDialog>
        <FixedCreateBtn v-if="canCreateMeeting"
                        :path="meetingCreatePath()"
                        color="red"
                        left
        />
    </div>
</template>

<script>

import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';
import ClubDetailMeetingPost from '@/views/clubDetail/components/meeting/ClubDetailMeetingPost.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import MeetingTimeRange from '@/components/meeting/MeetingTimeRange.vue';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'ClubDetailMeeting',
    components: { MeetingTimeRange, YesOrNoDialog, InfiniteScrollTemplate, ClubDetailMeetingPost, FixedCreateBtn },
    props: {
        currentUserInfo: Object,
        meetingList: Array,
        meetingPage: Object,
    },
    data() {
        return {
            showRegisterDialog: false,
            registerTargetMeeting: {},
            showCancelDialog: false,
            cancelTargetMeeting: {},
        };
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        canCreateMeeting() {
            const { isMaster, isManager } = this.currentUserInfo;
            return isMaster || isManager;
        },
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstMeetingList(this.clubSeq);
        },
        fetchNextPage() {
            return actionsHelper.requestNextClubList(this.clubSeq);
        },
        meetingCreatePath() {
            return generateParamPath(PATH.CLUB.MEETING_CREATE, routerHelper.clubSeq());
        },
        openRegisterDialog(meeting) {
            this.showRegisterDialog = true;
            this.registerTargetMeeting = meeting;
        },
        registerMeeting() {
            const meetingApplicationInfo = {
                clubSeq: this.clubSeq,
                meetingSeq: this.registerTargetMeeting.seq,
            };
            return actionsHelper.requestMeetingApplication(meetingApplicationInfo)
                .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_APPLY_MEETING_APPLICATION));
        },
        openCancelDialog(meeting) {
            this.showCancelDialog = true;
            this.cancelTargetMeeting = meeting;
        },
        cancelMeeting() {
            const meetingCancelInfo = {
                clubSeq: this.clubSeq,
                meetingSeq: this.cancelTargetMeeting.seq,
            };
            return actionsHelper.requestCancelMeetingApplication(meetingCancelInfo)
                .finally(this.close);
        },
    },

};
</script>

<style scoped>
</style>
