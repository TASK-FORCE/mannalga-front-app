<template>
    <div>
        <v-tabs v-model="tab">
            <v-tab
                v-for="menu in menus"
                :key="menu"
            >
                {{ menu }}
            </v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="tab">
            <ClubInfo :clubInfo="clubData.clubInfo"/>
            <ClubSchedule :scheduleList="clubData.scheduleList"/>
            <ClubBoard :boardList="clubData.boardList"/>
            <ClubAlbum :albumList="clubData.albumList"/>
        </v-tabs-items>
    </div>
</template>

<script>
// import { CLUBTEST } from '@/store/type/club_type.js'; // [CLUBTEST]
import ClubInfo from '@/components/club/ClubInfo.vue';
import ClubSchedule from '@/components/club/ClubSchedule.vue';
import ClubBoard from '@/components/club/ClubBoard.vue';
import ClubAlbum from '@/components/club/ClubAlbum.vue';

export default {
    name: 'ClubTab',
    components: { ClubInfo, ClubSchedule, ClubBoard, ClubAlbum },
    props: ['clubData'],
    data() {
        return {
            tab: null,
            menus: [
                '메인', '일정', '게시판', '사진첩',
            ],
        };
    },
};
</script>

<style scoped>
</style>
