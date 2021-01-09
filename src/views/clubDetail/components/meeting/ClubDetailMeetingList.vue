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
                    />
                </div>
            </template>
        </InfiniteScrollTemplate>
        <MeetingCancelDialog v-model="cancelDialog"
                             :meeting="cancelMeeting"
        />
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
import MeetingCancelDialog from '@/components/meeting/MeetingCancelDialog.vue';

export default {
    name: 'ClubDetailMeeting',
    components: { MeetingCancelDialog, InfiniteScrollTemplate, ClubDetailMeetingPost, FixedCreateBtn },
    props: {
        currentUserInfo: Object,
        meetingList: Array,
        meetingPage: Object,
    },
    data() {
        return {
            cancelDialog: false,
            cancelMeeting: {},
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
        openCancelDialog(cancelMeeting) {
            this.cancelDialog = true;
            this.cancelMeeting = cancelMeeting;
        },
    },

};
</script>

<style scoped>
</style>
