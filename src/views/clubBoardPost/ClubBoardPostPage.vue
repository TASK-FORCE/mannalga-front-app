<template>
    <div>
        <CommonHeader title="게시판"
                      @back="$router.push(clubDetailPath())"
        />
        <ClubBoardPostBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.ts';
import ClubBoardPostBody from '@/views/clubBoardPost/ClubBoardPostBody.vue';

export default {
    name: 'ClubBoardPostPage',
    components: { ClubBoardPostBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
    },
};
</script>

<style scoped>

</style>
