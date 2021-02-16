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
        <UserProfileAvatar v-if="userProfile.userName"
                           :size="40"
                           :name="userProfile.userName"
                           :appendNumber="userProfile.seq"
                           :imgUrl="userProfile.profileImageLink"
                           @click="moveToUserSettings"
        />
    </v-app-bar>
</template>

<script>
import { changeThemeAndLoad, isDarkTheme } from '@/plugins/vuetify.js';
import { PATH } from '@/router/route_path_type.js';
import _ from '@/utils/common/lodashWrapper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';

const SEARCH_WAIT_TIME = 500;

export default {
    name: 'ClubListPageHeader',
    components: { UserProfileAvatar },
    data() {
        return {
            isDarkTheme: isDarkTheme(),
            clubSearchPagePath: PATH.CLUB.SEARCH,
            searchText: null,
            searchCallback: _.debounce(this.search, SEARCH_WAIT_TIME),
            isDevEnv: process.env.NODE_ENV !== 'production',
        };
    },
    computed: {
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
        userProfile: () => gettersHelper.userProfile(),
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
    created() {
        if (!this.userProfile.userName) {
            actionsHelper.requestUserProfile();
        }
    },
    mounted() {
        if (process.env.NODE_ENV !== 'production') {
            this.searchText = '';
        }
    },
    methods: {
        moveToUserSettings() {
            this.$router.push(PATH.USER.SETTINGS);
        },
        changeTheme() {
            changeThemeAndLoad();
            this.isDarkTheme = isDarkTheme();
        },
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
