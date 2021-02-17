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
        <template #empty>
            <EmptyPage icon="supervisor"
                       title="모임이 없습니다."
                       description="원하는 모임을 직접 만들어 운영해보세요."
            />
        </template>
    </InfiniteScrollTemplate>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import ClubPost from '@/views/clubList/components/ClubPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import EmptyPage from '@/components/EmptyPage.vue';

export default {
    name: 'MyClubList',
    components: { EmptyPage, InfiniteScrollTemplate, ClubPost },
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
