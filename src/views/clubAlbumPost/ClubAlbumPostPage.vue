<template>
    <div>
        <CommonHeader title="사진첩"
                      @back="$router.push(clubDetailPath())"
        />
        <ClubAlbumPostBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubAlbumPostBody from '@/views/clubAlbumPost/ClubAlbumPostBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'ClubAlbumPostPage',
    components: { ClubAlbumPostBody, CommonHeader },
    methods: {
        clubDetailPath() {
            return generateParamPath(PATH.CLUB.MAIN, routerHelper.clubSeq());
        },
    },
};
</script>

<style scoped>

</style>
