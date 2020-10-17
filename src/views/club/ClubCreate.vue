<template>
    <div>
        <CommonHeader title="모임 만들기" />
        <ClubCreateBox />
    </div>
</template>

<script>

import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import ClubCreateBox from '@/components/club/create/ClubCreateBox.vue';

export default {
    name: 'ClubCreate',
    components: { ClubCreateBox, CommonHeader },
};
</script>

<style scoped>
</style>
