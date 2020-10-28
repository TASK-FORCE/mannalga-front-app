<template>
    <div>
        <v-tabs v-model="tab"
                grow
        >
            <v-tab
                v-for="menu in menus"
                :key="menu"
            >
                {{ menu }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <ClubMainInfoTab :clubInfo="clubData.clubInfo" />
            <ClubMainScheduleTab :scheduleList="clubData.scheduleList" />
            <ClubMainBoardTab :boardList="clubData.boardList" />
            <ClubMainAlbumTab :albumList="clubData.albumList" />
        </v-tabs-items>
    </div>
</template>

<script>
import ClubMainInfoTab from '@/components/club/clubmain/ClubMainInfoTab.vue';
import ClubMainScheduleTab from '@/components/club/clubmain/ClubMainScheduleTab.vue';
import ClubMainBoardTab from '@/components/club/clubmain/ClubMainBoardTab.vue';
import ClubMainAlbumTab from '@/components/club/clubmain/ClubMainAlbumTab.vue';

export default {
    name: 'ClubMainTab',
    components: { ClubMainInfoTab, ClubMainScheduleTab, ClubMainBoardTab, ClubMainAlbumTab },
    props: ['clubData'],
    data() {
        return {
            tab: null,
            menus: ['메인', '일정', '게시판', '사진첩'],
        };
    },
};
</script>
