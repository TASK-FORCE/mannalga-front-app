<template>
    <div>
        <v-tabs v-model="tab"
                class="club-main-tab"
                grow
        >
            <v-tab
                v-for="menu in menus"
                :key="menu.key"
                :href="`#${menu.key}`"
            >
                {{ menu.name }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item value="main">
                <ClubDetailMain :clubInfo="clubData.clubInfo" />
            </v-tab-item>
            <v-tab-item value="meeting">
                <ClubDetailMeeting />
            </v-tab-item>
            <v-tab-item value="board">
                <ClubDetailBoard :boardList="clubData.boardList" />
            </v-tab-item>
            <v-tab-item value="album">
                <ClubDetailAlbum :albumList="clubData.albumList" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubDetailMain from '@/views/clubDetail/components/main/ClubDetailMain.vue';
import ClubDetailMeeting from '@/views/clubDetail/components/meeting/ClubDetailMeeting.vue';
import ClubDetailBoard from '@/views/clubDetail/components/board/ClubDetailBoard.vue';
import ClubDetailAlbum from '@/views/clubDetail/components/album/ClubDetailAlbum.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import clubTabStore from '@/utils/ClubTabStore.js';

export default {
    name: 'ClubDetailPageBody',
    components: { ClubDetailMain, ClubDetailMeeting, ClubDetailBoard, ClubDetailAlbum },
    data() {
        return {
            tab: null,
            menus: [
                { name: '메인', key: 'main' },
                { name: '일정', key: 'meeting' },
                { name: '게시판', key: 'board' },
                { name: '사진첩', key: 'album' },
            ],
        };
    },
    computed: {
        clubData: () => gettersHelper.clubData(),
        clubSeq() {
            return this.$route.params.clubSeq;
        },
    },
    watch: {
        tab() {
            clubTabStore.save(this.clubSeq, this.tab);
        },
    },
    created() {
        this.tab = clubTabStore.get(this.clubSeq);
        // clubDetailDispatcher.dispatch(this.clubSeq, true, PATH.CLUB_LIST);
    },
};
</script>
