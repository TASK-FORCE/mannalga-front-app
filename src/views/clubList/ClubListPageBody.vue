<template>
    <div>
        <v-tabs v-model="currentTab"
                class="app-main-club-tab-header px-5"
                centered
                grow
        >
            <v-tab v-for="menu in menus"
                   :key="menu.key"
                   :href="`#${menu.key}`"
            >
                {{ menu.name }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentTab"
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
        <FixedCreateBtn :path="clubCreatePath"
                        color="blue"
        />
        <FixedScrollToTopBtn color="red" />
    </div>
</template>

<script>
import ClubList from '@/views/clubList/components/ClubList.vue';
import MyClubList from '@/views/clubList/components/MyClubList.vue';
import lastClubListTabCache from '@/utils/cache/LastClubListTabCache.js';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import FixedScrollToTopBtn from '@/components/button/FixedScrollToTopBtn.vue';
import { PATH } from '@/router/route_path_type.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'ClubListPageBody',
    components: { FixedScrollToTopBtn, FixedCreateBtn, MyClubList, ClubList },
    data() {
        return {
            clubCreatePath: PATH.CLUB.CREATE,
            tab: null,
            menus: [
                { name: '전체 모임', key: 'club' },
                { name: '내 모임', key: 'myClub' },
            ],
            style: {},
        };
    },
    computed: {
        currentTab: {
            get() {
                return gettersHelper.currentTab();
            },
            set(tab) {
                lastClubListTabCache.save(tab);
                mutationsHelper.setCurrentTab(tab);
            },
        },
    },
    created() {
        this.tab = lastClubListTabCache.get();
        const disableLoading = true;
        if (this.tab === 'club') {
            actionsHelper.requestFirstMyClubList(disableLoading);
        } else if (this.tab === 'myClub') {
            actionsHelper.requestFirstClubList(disableLoading);
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
};
</script>

<style scoped
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
