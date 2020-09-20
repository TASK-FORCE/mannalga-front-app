<template>
    <div>
        <CommonHeader title="글쓰기" />
        <ClubBoardCreateBox />
        <CommonCenterBtn text="작성 완료"
                         color="primary"
                         :outlined="true"
                         @click="createClubBoard"
        />
    </div>
</template>

<script>

import CommonHeader from '@/components/common/CommonHeader.vue';
import ClubBoardCreateBox from '@/components/club/ClubBoardCreateBox.vue';
import CommonCenterBtn from '@/components/common/CommonCenterBtn.vue';

export default {
    name: 'ClubCreate',
    components: { CommonCenterBtn, ClubBoardCreateBox, CommonHeader },
    methods: {
        createClubBoard() {
            
        },
    },
};
</script>

<style scoped>
</style>
