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
import { mapActions, mapGetters } from 'vuex';
import {
    CLUB_LIST,
    CLUB_LIST_MODULE,
    CLUB_PAGE,
    REQUEST_FIRST_CLUB_LIST,
    REQUEST_NEXT_CLUB_LIST,
    SEARCH_FILTER,
} from '@/store/type/club_list_type.js';

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
        ...mapGetters(CLUB_LIST_MODULE, { clubList: CLUB_LIST, clubPage: CLUB_PAGE, SEARCH_FILTER }),
    },
    created() {
        this[REQUEST_FIRST_CLUB_LIST]();
    },
    methods: {
        ...mapActions(CLUB_LIST_MODULE, [REQUEST_FIRST_CLUB_LIST, REQUEST_NEXT_CLUB_LIST]),
        findNextMyClubs() {
            // pass
        },
        findNextClubs(callback) {
            this[REQUEST_NEXT_CLUB_LIST]().then(() => callback());
        },
        changedSearchFilter() {
            this[REQUEST_FIRST_CLUB_LIST]();
        },
    },
};
</script>

<style scoped>

</style>
