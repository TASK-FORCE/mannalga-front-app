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
                <ClubDetailMain :clubInfo="clubInfo"
                                :userInfo="userInfo"
                />
            </v-tab-item>
            <v-tab-item value="meeting">
                <ClubDetailMeetingList :userInfo="userInfo"
                                       :meetingList="meetingList"
                                       :meetingPage="meetingPage"
                />
            </v-tab-item>
            <v-tab-item value="board">
                <ClubDetailBoard :boardList="clubData.boardList" />
            </v-tab-item>
            <v-tab-item value="album">
                <ClubDetailAlbum />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubDetailMain from '@/views/clubDetail/components/main/ClubDetailMain.vue';
import ClubDetailMeetingList from '@/views/clubDetail/components/meeting/ClubDetailMeetingList.vue';
import ClubDetailBoard from '@/views/clubDetail/components/board/ClubDetailBoard.vue';
import ClubDetailAlbum from '@/views/clubDetail/components/album/ClubDetailAlbum.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import clubTabStore from '@/utils/ClubTabStore.js';
import clubDetailDispatcher from '@/store/service/ClubDetailDispatcher.js';
import { PATH } from '@/router/route_path_type.js';
import routerParamHelper from '@/router/RouterParamHelper.js';

export default {
    name: 'ClubDetailPageBody',
    components: { ClubDetailMain, ClubDetailMeetingList, ClubDetailBoard, ClubDetailAlbum },
    data() {
        return {
            tab: null,
            menus: [
                { name: '메인', key: 'main' },
                { name: '만남', key: 'meeting' },
                { name: '게시판', key: 'board' },
                { name: '사진첩', key: 'album' },
            ],
        };
    },
    computed: {
        clubSeq: () => routerParamHelper.clubSeq(),
        clubData: () => gettersHelper.clubData(),
        clubInfo: () => gettersHelper.clubInfo(),
        userInfo: () => gettersHelper.userInfo(),
        meetingList: () => gettersHelper.meetingList(),
        meetingPage: () => gettersHelper.meetingPage(),
    },
    watch: {
        tab() {
            clubTabStore.save(this.clubSeq, this.tab);
        },
    },
    created() {
        this.tab = clubTabStore.get(this.clubSeq);
        clubDetailDispatcher.dispatch(this.clubSeq, true, PATH.CLUB_LIST);
    },
};
</script>
