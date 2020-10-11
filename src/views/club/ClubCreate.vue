<template>
    <div>
        <CommonHeader title="모임 만들기" />
        <CommonImageSelectBox class="image-box"
                              text="모임 대표 사진 등록"
                              height="140"
                              boxName="main" />
        <ClubCreateBox />
    </div>
</template>

<script>

import CommonHeader from '@/components/common/CommonHeader.vue';
import ClubCreateBox from '@/components/club/create/ClubCreateBox.vue';

export default {
    name: 'ClubCreate',
    components: { ClubCreateBox, CommonHeader },
};
</script>

<style scoped>
.image-box {
    margin-top: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>
