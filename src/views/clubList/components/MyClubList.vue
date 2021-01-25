<template>
    <InfiniteScrollTemplate name="myClub"
                            :firstPageCallback="this.fetchFirstPage"
                            :nextPageCallback="this.fetchNextPage"
                            :pageElements="myClubWrapperList"
                            :pageInfo="myClubPage"
    >
        <template v-slot:list-main>
            <div v-for="{seq, club, roles} in myClubWrapperList"
                 :key="seq"
            >
                <ClubPost :club="club"
                          :role="roles[0].name"
                          myPost
                />
            </div>
        </template>
    </InfiniteScrollTemplate>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import ClubPost from '@/views/clubList/components/ClubPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';

export default {
    name: 'MyClubList',
    components: { InfiniteScrollTemplate, ClubPost },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            isRequesting: false,
        };
    },
    computed: {
        myClubWrapperList: () => gettersHelper.myClubList(),
        myClubPage: () => gettersHelper.myClubPage(),
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstMyClubList();
        },
        fetchNextPage() {
            return actionsHelper.requestNextMyClubList();
        },
    },
};
</script>
