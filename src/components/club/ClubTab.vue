<template>
    <div>
        <!-- 
            1. 메인 탭 - 모임 정보 표시, 버튼(가입하기, 채팅 바로가기)
            2. 일정 탭 - 모임 일정
            3. 게시판 탭 - 게시판 기능, 댓글 기능
            4. 사진첩 탭 - 사진 게시판 기능, 댓글 기능
        -->
        <!-- <button v-on:click="logText">click me</button> -->
        <v-tabs v-model="tab">
            <v-tab
                v-for="menu in menus"
                :key="menu"
            >
                {{ menu }}
            </v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="tab">
            <ClubInfo />
            <ClubCalendar />
            <ClubBoard />
            <ClubAlbum />
        </v-tabs-items>
    </div>
</template>

<script>
// import { CLUBTEST } from '@/store/type/club_type.js'; // [CLUBTEST]
import ClubInfo from '@/components/club/ClubInfo.vue';
import ClubCalendar from '@/components/club/ClubCalendar.vue';
import ClubBoard from '@/components/club/ClubBoard.vue';
import ClubAlbum from '@/components/club/ClubAlbum.vue';

export default {
    name: 'ClubTab',
    components: { ClubInfo, ClubCalendar, ClubBoard, ClubAlbum },
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
