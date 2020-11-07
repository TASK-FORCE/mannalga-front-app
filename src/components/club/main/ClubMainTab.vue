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
            <v-tab-item v-for="tabItem in tabItems"
                        :key="tabItem.key"
                        :value="tabItem.key"
            >
                <component :is="tabItem.component" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubMainInfoTab from '@/components/club/main/ClubMainInfoTab.vue';
import ClubMainScheduleTab from '@/components/club/main/ClubMainScheduleTab.vue';
import ClubMainBoardTab from '@/components/club/main/ClubMainBoardTab.vue';
import ClubMainAlbumTab from '@/components/club/main/ClubMainAlbumTab.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import RenderFunction from '@/utils/common/renderFunction.js';
import { clubTabStore } from '@/utils/ClubTabStore.js';

export default {
    name: 'ClubMainTab',
    components: { ClubMainInfoTab, ClubMainScheduleTab, ClubMainBoardTab, ClubMainAlbumTab },
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
        tabItems() {
            return [
                {
                    component: RenderFunction.createComponent(ClubMainInfoTab, { clubInfo: this.clubData.clubInfo }),
                    key: 'main',
                },
                {
                    component: RenderFunction.createComponent(ClubMainScheduleTab, { scheduleList: this.clubData.scheduleList }),
                    key: 'meeting',
                },
                {
                    component: RenderFunction.createComponent(ClubMainBoardTab, { boardList: this.clubData.boardList }),
                    key: 'board',
                },
                {
                    component: RenderFunction.createComponent(ClubMainAlbumTab, { albumList: this.clubData.albumList }),
                    key: 'album',
                },
            ];
        },
    },
    watch: {
        tab() {
            clubTabStore.save(this.clubSeq, this.tab);
        },
    },
    created() {
        this.tab = clubTabStore.get(this.clubSeq);
    },
};
</script>
