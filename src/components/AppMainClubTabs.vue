<template>
    <div>
        <v-tabs v-model="tab"
                class="app-main-club-tab-header"
                centered
                grow
        >
            <v-tab
                v-for="menu in ['전체 모임', '내 모임']"
                :key="menu"
            >
                {{ menu }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <SearchFilterMain @changedSearchFilter="changedSearchFilter"/>
                <ClubList :clubList="clubList"
                          :page="clubPage"
                          @findNextPage="findNextClubs"
                />
            </v-tab-item>
            <v-tab-item>
                <ClubList :clubList="myClubList"
                          @findNextPage="findNextMyClubs"
                />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubList from '@/components/ClubList.vue';
import SearchFilterMain from '@/components/search/SearchFilterMain.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'AppMainClubTabs',
    components: { SearchFilterMain, ClubList },
    data() {
        return {
            tab: null,
            myClubList: [],
        };
    },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
        searchFilter: () => gettersHelper.searchFilter(),
    },
    created() {
        actionsHelper.requestFirstClubList();
    },
    methods: {
        findNextMyClubs() {
            // pass
        },
        findNextClubs(callback) {
            actionsHelper.requestNextClubList().then(() => callback());
        },
        changedSearchFilter() {
            actionsHelper.requestFirstClubList();
        },
    },
};
</script>

<style scoped>

</style>
