<template>
    <v-tab-item>
        <MyClubList :myClubContextList="myClubContextList"
                    :page="myClubPage"
                    @findFirstPage="findFirstMyClubList"
                    @findNextPage="findNextMyClubList"
        />
    </v-tab-item>
</template>

<script>
import MyClubList from '@/components/club/clubList/MyClubList.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import _ from '@/utils/lodashWrapper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'MyClubListTab',
    components: { MyClubList },
    computed: {
        myClubContextList: () => gettersHelper.myClubList(),
        myClubPage: () => gettersHelper.myClubPage(),
    },
    methods: {
        findFirstMyClubList(callback) {
            if (_.isEmpty(this.myClubContextList)) {
                actionsHelper.requestFirstMyClubList().then(() => callback());
            }
        },
        findNextMyClubList(callback) {
            actionsHelper.requestNextMyClubList().then(() => callback());
        },
    },
};
</script>

<style scoped>

</style>
