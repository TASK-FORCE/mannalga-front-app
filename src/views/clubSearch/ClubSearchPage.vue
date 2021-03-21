<template>
    <div>
        <CommonHeader title="모임 검색"
                      @back="$router.push(clubListPagePath)"
        />
        <ClubSearchPageBody />
    </div>
</template>

<script lang="ts">
import CommonHeader from '@/components/header/CommonHeader.vue';
import { PATH } from '@/router/route_path_type.ts';
import ClubSearchPageBody from '@/views/clubSearch/ClubSearchPageBody.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'ClubSearchPage',
    components: { ClubSearchPageBody, CommonHeader },
    data() {
        return {
            clubListPagePath: PATH.CLUB_LIST,
        };
    },
});
</script>

<style scoped>

</style>
