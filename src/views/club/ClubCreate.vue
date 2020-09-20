<template>
    <div>
        <CommonHeader title="모임 만들기" />
        <CommonImageSelectBox text="모임 대표 사진 등록" />
        <ClubCreateBox />
        <CommonCenterBtn text="모임 만들기"
                         color="primary"
                         :outlined="true"
                         @click="createClub"
        />
    </div>
</template>

<script>

import CommonHeader from '@/components/common/CommonHeader.vue';
import CommonImageSelectBox from '@/components/common/CommonImageSelectBox.vue';
import ClubCreateBox from '@/components/club/ClubCreateBox.vue';
import CommonCenterBtn from '@/components/common/CommonCenterBtn.vue';

export default {
    name: 'ClubCreate',
    components: { CommonCenterBtn, ClubCreateBox, CommonImageSelectBox, CommonHeader },
    methods: {
        createClub() {
            console.log('모임 생성!');
        },
    },
};
</script>

<style scoped>
</style>
