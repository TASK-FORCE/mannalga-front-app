<template>
    <div>
        <CommonHeader title="모임 만들기" />
        <ClubCreatePageBody />
    </div>
</template>

<script>

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubCreatePageBody from '@/views/clubCreate/ClubCreatePageBody.vue';

export default {
    name: 'ClubCreatePage',
    components: { CommonHeader, ClubCreatePageBody },
};
</script>

<style scoped>
</style>
