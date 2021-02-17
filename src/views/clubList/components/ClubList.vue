<template>
    <div>
        <ClubListSearchFilter class="club-search-filter" />
        <InfiniteScrollTemplate ref="clubScrollTemplate"
                                name="club"
                                :firstPageCallback="this.fetchFirstPage"
                                :nextPageCallback="this.fetchNextPage"
                                :pageElements="clubList"
                                :pageInfo="clubPage"
        >
            <template v-slot:list-main>
                <div v-for="club in clubList"
                     :key="club.seq"
                >
                    <ClubPost :club="club" />
                </div>
            </template>

            <template v-slot:empty>
                <EmptyPage v-if="hasSearchText"
                           icon="search"
                           title="검색 결과가 없습니다."
                           description="검색 조건을 줄이거나, 검색어를 확인해주세요."
                />
                <EmptyPage v-else
                           icon="supervisor"
                           title="모임이 없습니다."
                           description="원하는 모임을 직접 만들어 운영해보세요."
                />
            </template>
        </InfiniteScrollTemplate>
    </div>
</template>

<script>
import ClubListSearchFilter from '@/views/clubList/components/ClubListSearchFilter.vue';
import ClubPost from '@/views/clubList/components/ClubPost.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import EmptyPage from '@/components/EmptyPage.vue';

export default {
    name: 'ClubList',
    components: { EmptyPage, InfiniteScrollTemplate, ClubListSearchFilter, ClubPost },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            isRequesting: false,
        };
    },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
        hasSearchText() {
            return this.clubSearchFilterInfo.searchText;
        },
    },
    watch: {
        clubSearchFilterInfo() {
            this.$refs.clubScrollTemplate.requestFirstPage();
        },
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstClubList();
        },
        fetchNextPage() {
            return actionsHelper.requestNextClubList();
        },
    },
};
</script>
