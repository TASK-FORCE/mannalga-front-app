<template>
    <div>
        <ClubListSearchFilter class="club-search-filter" />
        <InfiniteScrollTemplate
            ref="clubScrollTemplate"
            name="club"
            :style="style"
            :firstPageCallback="this.fetchFirstPage"
            :nextPageCallback="this.fetchNextPage"
            :pageElements="clubList"
            :pageInfo="clubPage"
        >
            <template v-slot:list-main>
                <div
                    v-for="club in clubList"
                    :key="club.seq"
                >
                    <ClubPost :club="club" />
                </div>
            </template>

            <template v-slot:empty>
                <EmptyPage
                    v-if="hasSearchText"
                    icon="search"
                    title="검색 결과가 없습니다."
                    description="검색 조건을 줄이거나, 검색어를 확인해주세요."
                />
                <EmptyPage
                    v-else
                    icon="supervisor"
                    title="모임이 없습니다."
                    description="원하는 모임을 직접 만들어 운영해보세요."
                />
            </template>
        </InfiniteScrollTemplate>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ClubListSearchFilter from '@/views/clubList/components/ClubListSearchFilter.vue';
import ClubPost from '@/views/clubList/components/ClubPost.vue';
import InfiniteScrollTemplate from '@/components/InfiniteScrollTemplate.vue';
import EmptyPage from '@/components/EmptyPage.vue';
import { ClubFeed, ClubSearchContext } from '@/interfaces/clubList';
import { Page } from '@/interfaces/common';
import { ClubListActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
    name: 'ClubList',
    components: { EmptyPage, InfiniteScrollTemplate, ClubListSearchFilter, ClubPost },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            isRequesting: false,
            style: {},
        };
    },
    computed: {
        clubList(): ClubFeed[] {
            return this.$store.state.clubList.clubList;
        },
        clubPage(): Page {
            return this.$store.state.clubList.clubPage;
        },
        clubSearchContext(): ClubSearchContext {
            return this.$store.state.clubList.clubSearchContext;
        },
        hasSearchText() {
            return this.clubSearchContext.searchText;
        },
        resolveStyle() {
            return {
                'padding-top': '50px !important',
            };
        },
    },
    watch: {
        clubSearchContext() {
            this.$refs.clubScrollTemplate.requestFirstPage();
        },
    },
    mounted() {
        this.$nextTick(() => {
            const header = document.querySelector('.club-search-filter');
            if (header) {
                this.style = {
                    paddingTop: `${header.clientHeight}px !important`,
                };
            }
        });
    },
    methods: {
        fetchFirstPage() {
            return this.$store.dispatch(ClubListActionTypes.REQUEST_FIRST_CLUB_LIST, false);
        },
        fetchNextPage() {
            return this.$store.dispatch(ClubListActionTypes.REQUEST_NEXT_CLUB_LIST);
        },
    },
});
</script>

