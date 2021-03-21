<template>
    <div>
        <InfiniteScrollTemplate
            name="meeting"
            :firstPageCallback="this.fetchFirstPage"
            :nextPageCallback="this.fetchNextPage"
            :pageElements="meetingGroupList"
            :pageInfo="meetingGroupPage"
            :withListGroup="false"
        >
            <template v-slot:list-main>
                <div
                    v-for="(meetingGroup, index) in meetingGroupList"
                    :key="index"
                >
                    <div class="meeting-group">
                        <div class="meeting-group-date-text">
                            {{ meetingGroup.groupYearMonth }}
                        </div>
                        <div class="meeting-group-meetings">
                            <div
                                v-for="(meeting, index) in meetingGroup.meetings"
                                :key="meeting.seq"
                            >
                                <ClubDetailMeetingPost
                                    :meeting="meeting"
                                    :class="(index === meetingGroup.meetings.length - 1) ? 'last-child' : null"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <EmptyPage
                    icon="calendarOut"
                    title="만남이 없습니다."
                    description="만남을 만들어 모임원들을 만나보세요."
                />
            </template>
        </InfiniteScrollTemplate>
        <FixedCreateBtn
            v-if="canCreateMeeting"
            :path="meetingCreatePath()"
            color="#E8984E"
            :size="60"
            :icon-size="40"
        />
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import ClubDetailMeetingPost from '@/views/clubDetail/components/meeting/ClubDetailMeetingPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import EmptyPage from '@/components/EmptyPage.vue';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { CurrentUserInfo } from '../../../../interfaces/club';
import { MeetingActionTypes } from '@/store/type/actionTypes';
import { MeetingFeedGroup, MeetingSeqContext } from '@/interfaces/meeting';
import { Page } from '@/interfaces/common';

export default Vue.extend({
    name: 'ClubDetailMeeting',
    components: { EmptyPage, InfiniteScrollTemplate, ClubDetailMeetingPost, FixedCreateBtn },
    props: {
        currentUserInfo: Object as PropType<CurrentUserInfo>,
    },
    computed: {
        clubSeq: () => routerHelper.clubSeq(),
        meetingGroupList(): MeetingFeedGroup[] {
            return this.$store.state.meeting.meetingGroupList;
        },
        meetingGroupPage(): Page {
            return this.$store.state.meeting.meetingGroupPage;
        },
        canCreateMeeting() {
            const { isMaster, isManager } = this.currentUserInfo;
            return isMaster || isManager;
        },
    },
    methods: {
        fetchFirstPage() {
            return this.$store.dispatch(MeetingActionTypes.REQUEST_FIRST_MEETING_GROUP_LIST, this.clubSeq);
        },
        fetchNextPage() {
            return this.$store.dispatch(MeetingActionTypes.REQUEST_NEXT_MEETING_GROUP_LIST, this.clubSeq);
        },
        meetingCreatePath() {
            return generateParamPath(PATH.CLUB.MEETING_CREATE, routerHelper.clubSeq());
        },
        registerMeeting() {
            const meetingSeqContext: MeetingSeqContext = {
                clubSeq: this.clubSeq,
                meetingSeq: this.registerTargetMeeting.seq,
            };
            return this.$store.dispatch(MeetingActionTypes.REQUEST_MEETING_APPLICATION, meetingSeqContext)
                .then(() => this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_APPLY_MEETING_APPLICATION));
        },
        cancelMeeting() {
            const meetingSeqContext: MeetingSeqContext = {
                clubSeq: this.clubSeq,
                meetingSeq: this.cancelTargetMeeting.seq,
            };
            return this.$store.dispatch(MeetingActionTypes.REQUEST_CANCEL_MEETING_APPLICATION, meetingSeqContext)
                .finally(this.close);
        },
    },
});
</script>

<style
    scoped
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
