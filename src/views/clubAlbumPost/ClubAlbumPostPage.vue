<template>
    <div>
        <CommonHeader title="사진첩"
                      @click="$router.back()"
        />
        <ClubAlbumPostBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubAlbumPostBody from '@/views/clubAlbumPost/ClubAlbumPostBody.vue';

export default {
    name: 'ClubAlbumPostPage',
    components: { ClubAlbumPostBody, CommonHeader },
};
</script>

<style scoped>

</style>
