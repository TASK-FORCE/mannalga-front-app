<template>
    <div>
        <v-tabs
            v-model="currentTab"
            class="app-main-club-tab-header px-5"
            centered
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
            v-model="currentTab"
            touchless
            :style="style"
        >
            <v-tab-item value="club">
                <ClubList />
            </v-tab-item>
            <v-tab-item value="myClub">
                <MyClubList />
            </v-tab-item>
        </v-tabs-items>
        <FixedCreateBtn
            :path="clubCreatePath"
            color="blue"
        />
        <FixedScrollToTopBtn color="red" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClubList from '@/views/clubList/components/ClubList.vue';
import MyClubList from '@/views/clubList/components/MyClubList.vue';
import lastClubListTabCache from '@/utils/cache/LastClubListTabCache.ts';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import FixedScrollToTopBtn from '@/components/button/FixedScrollToTopBtn.vue';
import { PATH } from '@/router/route_path_type.js';
import { ActionTypes, MutationTypes } from '@/store/type/methodTypes.ts';
import { ClubListPageTab } from '@/interfaces/club';

export default Vue.extend({
    name: 'ClubListPageBody',
    components: { FixedScrollToTopBtn, FixedCreateBtn, MyClubList, ClubList },
    data() {
        return {
            clubCreatePath: PATH.CLUB.CREATE,
            tab: null as ClubListPageTab,
            menus: [
                { name: '전체 모임', key: 'club' },
                { name: '내 모임', key: 'myClub' },
            ],
            style: {},
        };
    },
    computed: {
        currentTab: {
            get(): string {
                return this.$store.state.club.currentTab;
            },
            set(tab: ClubListPageTab) {
                lastClubListTabCache.save(tab);
                this.$store.commit(MutationTypes.SET_CURRENT_TAB, tab);
            },
        },
    },
    created() {
        this.tab = lastClubListTabCache.get();
        if (this.tab === ClubListPageTab.CLUB) {
            this.$store.dispatch(ActionTypes.REQUEST_FIRST_MY_CLUB_LIST, true);
        } else if (this.tab === ClubListPageTab.MY_CLUB) {
            this.$store.dispatch(ActionTypes.REQUEST_FIRST_CLUB_LIST, true);
        }
    },
    mounted() {
        this.$nextTick(() => {
            const header = document.querySelector('.app-main-club-tab-header');
            if (header) {
                this.style = {
                    paddingTop: `${header.clientHeight}px`,
                };
            }
        });
    },
});
</script>

<style
    scoped
    lang="scss"
>
.app-main-club-tab-header {
    position: fixed;
    z-index: 5;
    background-color: #FFFFFF;
}

.theme--dark {
    .app-main-club-tab-header {
        background-color: #121212;
    }

}
</style>
