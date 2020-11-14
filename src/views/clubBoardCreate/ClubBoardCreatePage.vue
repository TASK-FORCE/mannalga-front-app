<template>
    <div>
        <CommonHeader title="글쓰기"
                      @click="$router.push(clubPath)"
        />
        <ClubBoardCreatePageBody />
    </div>
</template>

<script>

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubBoardCreatePageBody from '@/views/clubBoardCreate/ClubBoardCreatePageBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubCreate',
    components: { CommonHeader, ClubBoardCreatePageBody },
    data() {
        return {
            clubPath: null,
        };
    },
    mounted() {
        const { clubSeq } = this.$route.params;
        this.clubPath = generateParamPath(PATH.CLUB.MAIN, [clubSeq]);
    },
};
</script>

<style scoped>
</style>
