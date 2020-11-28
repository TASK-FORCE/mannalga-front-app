<template>
    <div class="h-100">
        <ClubListSearchFilter id="club-search-filter" />
        <v-list v-show="!isLoading"
                class="py-0"
        >
            <v-list-item-group id="club-list-group">
                <div id="club-list-sentinel" />
                <div v-if="clubList && clubList.length > 0">
                    <template v-for="club in clubList">
                        <ClubPost :key="club.seq"
                                  :club="club"
                        />
                    </template>
                </div>
                <div v-else
                     class="club-empty-result-wrapper"
                     :style="{height: `${calculateEmptyPageHeight()}px`}"
                >
                    <div class="club-empty-result-box">
                        <div>
                            <v-icon x-large>mdi-emoticon-cry-outline</v-icon>
                        </div>
                        <div>
                            모임이 없어요
                        </div>
                    </div>
                </div>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import ClubListSearchFilter from '@/views/clubList/components/ClubListSearchFilter.vue';
import ClubPost from '@/views/clubList/components/ClubPost.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
    name: 'ClubList',
    components: { ClubListSearchFilter, ClubPost },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            searchFilterElement: null,
            isRequesting: false,
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
        clubSearchFilterInfo: () => gettersHelper.clubSearchFilterInfo(),
        isLastPage() {
            return this.clubPage.isLastPage;
        },
        isFirstPage() {
            return this.clubPage.nextPage === 0;
        },
    },
    watch: {
        clubSearchFilterInfo() {
            this.fetchFirstPage();
        },
    },
    mounted() {
        this.listGroup = document.querySelector('#club-list-group');
        this.sentinel = document.querySelector('#club-list-sentinel');
        this.searchFilterElement = document.querySelector('#club-search-filter');
        if (_.isEmpty(this.clubList)) {
            this.fetchFirstPage();
        } else {
            this.insertSentinel();
        }
        this.setInfiniteScrollObserver();
    },
    methods: {
        fetchFirstPage() {
            actionsHelper.requestFirstClubList().then(() => this.insertSentinel());
        },
        insertSentinel() {
            this.listGroup.insertBefore(this.sentinel, this.listGroup.children[this.listGroup.children.length - 2]);
        },
        setInfiniteScrollObserver() {
            const infiniteScrollCallback = entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target === this.sentinel && this.canRequest()) {
                        this.isRequesting = true;
                        actionsHelper.requestNextClubList().then(() => this.moveSentinel());
                    }
                });
            };
            const observer = new IntersectionObserver(infiniteScrollCallback, { threshold: 0.75 });
            observer.observe(this.sentinel);
        },
        moveSentinel() {
            this.insertSentinel();
            this.isRequesting = false;
        },
        canRequest() {
            return !this.isRequesting && !this.isLastPage && !this.isFirstPage;
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
