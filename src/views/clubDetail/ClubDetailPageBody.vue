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
                                :currentUserInfo="currentUserInfo"
                                :clubUserList="clubUserList"
                />
            </v-tab-item>
            <v-tab-item value="meeting">
                <ClubDetailMeetingList :currentUserInfo="currentUserInfo" />
            </v-tab-item>
            <v-tab-item value="board">
                <ClubDetailBoardList :currentUserInfo="currentUserInfo"
                                     :boardList="clubData.boardList"
                />
            </v-tab-item>
            <v-tab-item value="album">
                <ClubDetailAlbumList :currentUserInfo="currentUserInfo" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubDetailMain from '@/views/clubDetail/components/main/ClubDetailMain.vue';
import ClubDetailMeetingList from '@/views/clubDetail/components/meeting/ClubDetailMeetingList.vue';
import ClubDetailBoardList from '@/views/clubDetail/components/board/ClubDetailBoardList.vue';
import ClubDetailAlbumList from '@/views/clubDetail/components/album/ClubDetailAlbumList.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import lastClubTabCache from '@/utils/cache/LastClubTabCache.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.js';
import { PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'ClubDetailPageBody',
    components: { ClubDetailMain, ClubDetailMeetingList, ClubDetailBoardList, ClubDetailAlbumList },
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
        currentUserInfo: () => gettersHelper.currentUserInfo(),
        clubUserList: () => gettersHelper.clubUserList(),
        isLoading: () => gettersHelper.isLoading(),
    },
    watch: {
        tab() {
            lastClubTabCache.save(this.clubSeq, this.tab);
        },
    },
    mounted() {
        this.tab = lastClubTabCache.get(this.clubSeq);
        if (this.clubInfo.seq === 0) {
            clubDetailVuexService.dispatch(this.clubSeq, true, PATH.CLUB_LIST);
        }
    },
};
</script>
