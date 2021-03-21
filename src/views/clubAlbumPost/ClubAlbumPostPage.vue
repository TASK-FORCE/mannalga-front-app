<template>
    <div>
        <CommonHeader
            title="사진첩"
            @back="$router.push(clubDetailPath())"
        />
        <ClubAlbumPostBody />
    </div>
</template>

<script lang="ts">
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubAlbumPostBody from '@/views/clubAlbumPost/ClubAlbumPostBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import routerHelper from '@/router/RouterHelper.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'ClubAlbumPostPage',
    components: { ClubAlbumPostBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
    },
});
</script>

<style scoped>

</style>
