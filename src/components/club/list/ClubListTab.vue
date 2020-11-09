<template>
    <v-tab-item>
        <SearchFilterMain @changeSearchFilter="changeSearchFilter" />
        <ClubList ref="clubListComponent"
                  :clubList="clubList"
                  :page="clubPage"
                  @findFirstPage="findFirstClubList"
                  @findNextPage="findNextClubList"
        />
    </v-tab-item>
</template>

<script>
import SearchFilterMain from '@/components/search/SearchFilterMain.vue';
import ClubList from '@/components/club/list/ClubList.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
    name: 'ClubListTab',
    components: { ClubList, SearchFilterMain },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
    },
    methods: {
        changeSearchFilter() {
            actionsHelper.requestFirstClubList()
                .then(() => this.$refs.clubListComponent.insertSentinel());
        },
        findFirstClubList(callback) {
            if (_.isEmpty(this.clubList)) {
                actionsHelper.requestFirstClubList().then(() => callback());
            }
        },
        findNextClubList(callback) {
            actionsHelper.requestNextClubList().then(() => callback());
        },
    },
};
</script>

<style scoped>

</style>
