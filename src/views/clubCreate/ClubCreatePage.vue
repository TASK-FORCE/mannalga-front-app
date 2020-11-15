<template>
    <div>
        <CommonHeader title="모임 만들기"
                      @click="$router.push(clubListPath)"
        />
        <ClubCreatePageBody />
    </div>
</template>

<script>

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubCreatePageBody from '@/views/clubCreate/ClubCreatePageBody.vue';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubCreatePage',
    components: { CommonHeader, ClubCreatePageBody },
    data() {
        return {
            clubListPath: PATH.CLUB_LIST,
        };
    },
};
</script>

<style scoped>
</style>
