<template>
    <div>
        <CommonHeader title="만남"
                      @back="$router.push(clubDetailPath())"
        />
        <ClubMeetingPostBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';
import ClubMeetingPostBody from '@/views/clubMeetingPost/ClubMeetingPostBody.vue';

export default {
    name: 'ClubMeetingPostPage',
    components: { ClubMeetingPostBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
    },
};
</script>

<style scoped>

</style>
