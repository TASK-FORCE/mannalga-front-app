<template>
    <div>
        <CommonHeader title="만남"
                      @click="$router.push(clubDetailPath())"
        />
        <ClubMeetingPostBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerParamHelper from '@/router/RouterParamHelper.js';
import ClubMeetingPostBody from '@/views/clubMeetingPost/ClubMeetingPostBody.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'ClubMeetingPostPage',
    components: { ClubMeetingPostBody, CommonHeader },
    computed: {
        meeting: () => gettersHelper.meeting(),
    },
    beforeMount() {
        if (this.meeting.seq === 0) {
            this.$router.push(this.clubDetailPath());
        }
    },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerParamHelper.clubSeq());
        },
    },
};
</script>

<style scoped>

</style>
