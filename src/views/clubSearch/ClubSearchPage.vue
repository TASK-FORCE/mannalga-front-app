<template>
    <div>
        <CommonHeader title="모임 검색"
                      @click="$router.push(clubListPagePath)"
        />
        <ClubSearchPageBody />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import { PATH } from '@/router/route_path_type.js';
import ClubSearchPageBody from '@/views/clubSearch/ClubSearchPageBody.vue';

export default {
    name: 'ClubSearchPage',
    components: { ClubSearchPageBody, CommonHeader },
    data() {
        return {
            clubListPagePath: PATH.CLUB_LIST,
        };
    },
};
</script>

<style scoped>

</style>
