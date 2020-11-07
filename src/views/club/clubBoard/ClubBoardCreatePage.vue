<template>
    <div>
        <CommonHeader title="글쓰기"
                      @click="$router.push(clubPath)"
        />
        <ClubBoardCreateBox />
    </div>
</template>

<script>

import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import ClubBoardCreateBox from '@/components/club/create/ClubBoardCreateBox.vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import CommonCenterBtn from '@/components/ui/button/CommonCenterBtn.vue';
import { combineParamPath, PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubCreate',
    components: { ClubBoardCreateBox, CommonHeader },
    data() {
        return {
            clubPath: null,
        };
    },
    mounted() {
        const { clubSeq } = this.$route.params;
        this.clubPath = combineParamPath(PATH.CLUB.MAIN, [clubSeq]);
        console.log(this.clubPath);
    },
};
</script>

<style scoped>
</style>
