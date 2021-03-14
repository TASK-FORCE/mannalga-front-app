<template>
    <div>
        <InfiniteScrollTemplate name="meeting"
                                :firstPageCallback="this.fetchFirstPage"
                                :nextPageCallback="this.fetchNextPage"
                                :pageElements="meetingGroupList"
                                :pageInfo="meetingGroupPage"
                                :withListGroup="false"
        >
            <template v-slot:list-main>
                <div v-for="(meetingGroup, index) in meetingGroupList"
                     :key="index"
                >
                    <div class="meeting-group">
                        <div class="meeting-group-date-text">
                            {{ meetingGroup.groupYearMonth }}
                        </div>
                        <div class="meeting-group-meetings">
                            <div v-for="(meeting, index) in meetingGroup.meetings"
                                 :key="meeting.seq"
                            >
                                <ClubDetailMeetingPost :meeting="meeting"
                                                       :class="(index === meetingGroup.meetings.length - 1) ? 'last-child' : null"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <EmptyPage icon="calendarOut"
                           title="만남이 없습니다."
                           description="만남을 만들어 모임원들을 만나보세요."
                />
            </template>
        </InfiniteScrollTemplate>
        <FixedCreateBtn v-if="canCreateMeeting"
                        :path="meetingCreatePath()"
                        color="#E8984E"
                        :size="60"
                        :icon-size="40"
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
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import EmptyPage from '@/components/EmptyPage.vue';

export default {
    name: 'ClubDetailMeeting',
    components: { EmptyPage, InfiniteScrollTemplate, ClubDetailMeetingPost, FixedCreateBtn },
    props: {
        currentUserInfo: Object,
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        meetingGroupList: () => gettersHelper.meetingGroupList(),
        meetingGroupPage: () => gettersHelper.meetingGroupPage(),
        canCreateMeeting() {
            const { isMaster, isManager } = this.currentUserInfo;
            return isMaster || isManager;
        },
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstMeetingGroupList(this.clubSeq);
        },
        fetchNextPage() {
            return actionsHelper.requestNextMeetingGroupList(this.clubSeq);
        },
        meetingCreatePath() {
            return generateParamPath(PATH.CLUB.MEETING_CREATE, routerHelper.clubSeq());
        },
        registerMeeting() {
            const meetingApplicationInfo = {
                clubSeq: this.clubSeq,
                meetingSeq: this.registerTargetMeeting.seq,
            };
            return actionsHelper.requestMeetingApplication(meetingApplicationInfo)
                .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_APPLY_MEETING_APPLICATION));
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

<style scoped
       lang="scss"
>
.meeting-group {
    padding: 20px 25px;

    .meeting-group-date-text {
        font-weight: 700;
        font-size: 15px;
        color: #9F9F9F;
    }

    .meeting-group-meetings {
        padding-top: 11px;
    }
}
</style>
