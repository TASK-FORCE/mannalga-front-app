<template>
    <v-app-bar class="elevation-0"
               app
    >
        <v-text-field v-model="searchText"
                      class="club-search-bar"
                      placeholder="모임을 검색하세요."
                      prepend-icon="$search"
        />
        <v-spacer />
        <UserSettingPageEnterAvatar />
    </v-app-bar>
</template>

<script>
import { PATH } from '@/router/route_path_type.js';
import _ from '@/utils/common/lodashWrapper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import UserSettingPageEnterAvatar from '@/components/UserSettingPageEnterAvatar.vue';

const SEARCH_WAIT_TIME = 500;

export default {
    name: 'ClubListPageHeader',
    components: { UserSettingPageEnterAvatar },
    data() {
        return {
            clubSearchPagePath: PATH.CLUB.SEARCH,
            searchText: null,
            searchCallback: _.debounce(this.search, SEARCH_WAIT_TIME),
        };
    },
    computed: {
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
        currentTab: () => gettersHelper.currentTab(),
    },
    watch: {
        searchText(value) {
            if (_.isEmpty(value)) {
                return;
            }
            mutationsHelper.setCurrentTab('club');
            mutationsHelper.changeCommonLoading(true);
            this.searchCallback();
        },
        clubSearchFilterInfo() {
            this.searchText = this.clubSearchFilterInfo.searchText;
        },
    },
    mounted() {
        if (process.env.NODE_ENV !== 'production') {
            this.searchText = '';
        }
    },
    methods: {
        search() {
            mutationsHelper.changeClubSearchText(this.searchText);
        },
    },
};
</script>

<style lang="scss"
       scoped
>
.v-toolbar__content {
    padding: 0 !important;
}
</style>
