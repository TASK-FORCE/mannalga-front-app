<template>
    <v-tab-item>
        <SearchFilterMain @changedSearchFilter="changedSearchFilter" />
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
import ClubList from '@/components/clubList/ClubList.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import _ from '@/utils/lodashWrapper.js';

export default {
    name: 'ClubListBox',
    components: { ClubList, SearchFilterMain },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
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
        findNextClubList(callback) {
            actionsHelper.requestNextClubList().then(() => callback());
        },
    },
};
</script>

<style scoped>

</style>
