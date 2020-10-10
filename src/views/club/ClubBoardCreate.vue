<template>
    <div>
        <CommonHeader title="글쓰기" />
        <ClubBoardCreateBox />
        <div class="image-box-wrapper">
            <CommonImageSelectBox class="image-box" 
                                  height="60" />
            <CommonImageSelectBox class="image-box" 
                                  height="60" />
            <CommonImageSelectBox class="image-box" 
                                  height="60" />
        </div>
        <div style="clear:both;">
            <CommonCenterBtn text="작성 완료"
                            color="primary"
                            :outlined="true"
                            @click="createClubBoard"
            />
        </div>
    </div>
</template>

<script>

import CommonHeader from '@/components/common/CommonHeader.vue';
import ClubBoardCreateBox from '@/components/club/ClubBoardCreateBox.vue';
import CommonImageSelectBox from '@/components/common/CommonImageSelectBox.vue';
import CommonCenterBtn from '@/components/common/CommonCenterBtn.vue';

export default {
    name: 'ClubCreate',
    components: { CommonCenterBtn, ClubBoardCreateBox, CommonImageSelectBox, CommonHeader },
    methods: {
        createClubBoard() {
            
        },
    },
};
</script>

<style scoped>
.image-box-wrapper {
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
}
.image-box {
    float: left;
    margin-right: 10px;
    width:60px;
    /* height: 70px; */
    /* width: calc(100% / 3); */
    margin-bottom: 2rem;
}
</style>
