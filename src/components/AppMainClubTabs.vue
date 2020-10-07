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
                <SearchFilterMain @changedSearchFilter="changedSearchFilter" />
                <ClubList ref="clubListComponent"

                          :clubList="clubList"
                          :page="clubPage"
                          @findFirstPage="findFirstClubList"
                          @findNextPage="findNextClubList"
                />
            </v-tab-item>
            <v-tab-item>
                <MyClubList :myClubContextList="myClubContextList"
                            :page="myClubPage"
                            @findFirstPage="findFirstMyClubList"
                            @findNextPage="findNextMyClubList"
                />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubList from '@/components/clubList/ClubList.vue';
import SearchFilterMain from '@/components/search/SearchFilterMain.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import MyClubList from '@/components/clubList/MyClubList.vue';
import goTo from 'vuetify/es5/services/goto';
import _ from '@/utils/lodashWrapper.js';

export default {
    name: 'AppMainClubTabs',
    components: { MyClubList, SearchFilterMain, ClubList },
    data() {
        return {
            tab: null,
        };
    },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
        searchFilter: () => gettersHelper.searchFilter(),
        myClubContextList: () => gettersHelper.myClubList(),
        myClubPage: () => gettersHelper.myClubPage(),
    },
    updated() {
        const { rememberPositionY } = this.$route.query;
        if (rememberPositionY) {
            goTo(rememberPositionY);
        }
    },
    methods: {
        changedSearchFilter() {
            actionsHelper.requestFirstClubList()
                .then(() => this.$refs.clubListComponent.insertSentinel());
        },
        findFirstClubList(callback) {
            if (_.isEmpty(this.clubList)) {
                actionsHelper.requestFirstClubList().then(() => callback());
            }
        },
        findFirstMyClubList(callback) {
            if (_.isEmpty(this.myClubContextList)) {
                actionsHelper.requestFirstMyClubList().then(() => callback());
            }
        },
        findNextClubList(callback) {
            actionsHelper.requestNextClubList().then(() => callback());
        },
        findNextMyClubList(callback) {
            actionsHelper.requestNextMyClubList().then(() => callback());
        },
    },
};
</script>

<style scoped>

</style>
