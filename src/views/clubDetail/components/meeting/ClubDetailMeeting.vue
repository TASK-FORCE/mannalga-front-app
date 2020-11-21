<template>
    <div>
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

export default {
    name: 'ClubDetailMeeting',
    components: { FixedCreateBtn },
    props: {
        userInfo: Object,
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
