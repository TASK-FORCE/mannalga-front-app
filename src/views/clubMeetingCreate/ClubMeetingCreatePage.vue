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
import routerParamHelper from '@/router/RouterParamHelper.js';

export default {
    name: 'ClubMeetingCreatePage',
    components: { ClubMeetingCreatePageBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerParamHelper.clubSeq());
        },
    },
};
</script>

<style scoped>

</style>
