<template>
    <div>
        <CommonHeader title="게시글 작성"
                      @back="$router.push(clubPath)"
        />
        <ClubBoardCreatePageBody />
    </div>
</template>

<script lang="ts">

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubBoardCreatePageBody from '@/views/clubBoardCreate/ClubBoardCreatePageBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import Vue from 'vue';

export default Vue.extend({
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
});
</script>

<style scoped>
</style>
