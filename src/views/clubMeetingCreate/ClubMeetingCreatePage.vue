<template>
    <div>
        <CommonHeader title="만남 생성"
                      @click="$router.push(clubDetailPath())"
        />
        <ClubMeetingCreatePageBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubMeetingCreatePageBody from '@/views/clubMeetingCreate/ClubMeetingCreatePageBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'ClubMeetingCreatePage',
    components: { ClubMeetingCreatePageBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
    },
};
</script>

<style scoped>

</style>
