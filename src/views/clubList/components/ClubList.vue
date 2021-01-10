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

            <template v-slot:fallback>
                <div class="club-empty-result-wrapper"
                     :style="{height: `${calculateEmptyPageHeight()}px`}"
                >
                    <div class="club-empty-result-box">
                        <div>
                            <v-icon x-large
                                    v-text="'$cryOut'"
                            />
                        </div>
                        <div>
                            모임이 없어요
                        </div>
                    </div>
                </div>
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

export default {
    name: 'ClubList',
    components: { InfiniteScrollTemplate, ClubListSearchFilter, ClubPost },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            searchFilterElement: null,
            isRequesting: false,
        };
    },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
    },
    watch: {
        clubSearchFilterInfo() {
            this.$refs.clubScrollTemplate.requestFirstPage();
        },
    },
    mounted() {
        this.searchFilterElement = document.querySelector('#club-search-filter');
    },
    methods: {
        fetchFirstPage() {
            return actionsHelper.requestFirstClubList();
        },
        fetchNextPage() {
            return actionsHelper.requestNextClubList();
        },
        calculateEmptyPageHeight() {
            if (this.searchFilterElement) {
                const { bottom } = this.searchFilterElement.getBoundingClientRect();
                return window.innerHeight - bottom;
            }
            return 500;
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.club-empty-result-wrapper {
    position: relative;

    .club-empty-result-box {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 1.5rem;
    }
}
</style>
