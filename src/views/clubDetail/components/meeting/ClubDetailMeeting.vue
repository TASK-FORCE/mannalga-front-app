<template>
    <div>
        <FixedCreateBtn :path="meetingCreatePath()"
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
    methods: {
        meetingCreatePath() {
            return generateParamPath(PATH.CLUB.MEETING_CREATE, routerParamHelper.clubSeq());
        },
    },
};
</script>

<style scoped>
</style>
