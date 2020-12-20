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

        <v-tabs-items v-if="!isLoading"
                      v-model="tab"
        >
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
                <ClubDetailAlbumList :userInfo="userInfo"/>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubDetailMain from '@/views/clubDetail/components/main/ClubDetailMain.vue';
import ClubDetailMeetingList from '@/views/clubDetail/components/meeting/ClubDetailMeetingList.vue';
import ClubDetailBoard from '@/views/clubDetail/components/board/ClubDetailBoard.vue';
import ClubDetailAlbumList from '@/views/clubDetail/components/album/ClubDetailAlbumList.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import clubTabStore from '@/utils/ClubTabStore.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.js';
import { PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'ClubDetailPageBody',
    components: { ClubDetailMain, ClubDetailMeetingList, ClubDetailBoard, ClubDetailAlbumList },
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
        clubSeq: () => routerHelper.clubSeq(),
        clubData: () => gettersHelper.clubData(),
        clubInfo: () => gettersHelper.clubInfo(),
        userInfo: () => gettersHelper.userInfo(),
        meetingList: () => gettersHelper.meetingList(),
        meetingPage: () => gettersHelper.meetingPage(),
        isLoading: () => gettersHelper.isLoading(),
    },
    watch: {
        tab() {
            clubTabStore.save(this.clubSeq, this.tab);
        },
    },
    mounted() {
        this.tab = clubTabStore.get(this.clubSeq);
        if (this.clubInfo.seq === 0) {
            clubDetailVuexService.dispatch(this.clubSeq, true, PATH.CLUB_LIST);
        }
    },
};
</script>
