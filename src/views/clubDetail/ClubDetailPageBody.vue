<template>
    <div>
        <v-tabs
            v-model="tab"
            class="club-main-tab px-5"
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

        <v-tabs-items
            v-show="!$store.state.common.loading"
            v-model="tab"
        >
            <v-tab-item value="main">
                <ClubDetailMain
                    :clubInfo="clubInfo"
                    :currentUserInfo="currentUserInfo"
                    :clubUserList="$store.state.club.clubUserList"
                />
            </v-tab-item>
            <v-tab-item value="meeting">
                <ClubDetailMeetingList :currentUserInfo="currentUserInfo" />
            </v-tab-item>
            <v-tab-item value="board">
                <ClubDetailBoardList :currentUserInfo="currentUserInfo" />
            </v-tab-item>
            <v-tab-item value="album">
                <ClubDetailAlbumList :currentUserInfo="currentUserInfo" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClubDetailMain from '@/views/clubDetail/components/main/ClubDetailMain.vue';
import ClubDetailMeetingList from '@/views/clubDetail/components/meeting/ClubDetailMeetingList.vue';
import ClubDetailBoardList from '@/views/clubDetail/components/board/ClubDetailBoardList.vue';
import ClubDetailAlbumList from '@/views/clubDetail/components/album/ClubDetailAlbumList.vue';
import lastClubTabCache from '@/utils/cache/LastClubTabCache.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.ts';
import { PATH } from '@/router/route_path_type.js';
import routerHelper from '@/router/RouterHelper.ts';
import { ClubInfo, CurrentUserInfo } from '@/interfaces/club.ts';

export default Vue.extend({
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
        clubInfo(): ClubInfo {
            return this.$store.state.club.clubInfo;
        },
        currentUserInfo(): CurrentUserInfo {
            return this.$store.state.club.currentUserInfo;
        },
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
});
</script>
