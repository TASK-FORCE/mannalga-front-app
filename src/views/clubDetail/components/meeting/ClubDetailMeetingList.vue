<template>
    <div>
        <v-list class="py-0"
                tile
        >
            <div v-for="meeting in meetingList"
                 :key="meeting.seq"
            >
                <ClubDetailMeetingPost :meeting="meeting" />
                <v-divider />
            </div>
        </v-list>
        <FixedCreateBtn v-if="canCreateMeeting"
                        :path="meetingCreatePath()"
                        color="red"
        />
    </div>
</template>

<script>

import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerParamHelper from '@/router/RouterParamHelper.js';
import ClubDetailMeetingPost from '@/views/clubDetail/components/meeting/ClubDetailMeetingPost.vue';

export default {
    name: 'ClubDetailMeeting',
    components: { ClubDetailMeetingPost, FixedCreateBtn },
    props: {
        userInfo: Object,
        meetingList: Array,
        meetingPage: Object,
    },
    data() {
        return {
            ripple: true,
        };
    },
    computed: {
        canCreateMeeting() {
            const { isMaster, isManager } = this.userInfo;
            return isMaster || isManager;
        },
    },
    methods: {
        meetingCreatePath() {
            return generateParamPath(PATH.CLUB.MEETING_CREATE, routerParamHelper.clubSeq());
        },
    },

};
</script>

<style scoped>
</style>
