<template>
    <div>
        <ClubListSearchFilter @changeSearchFilter="initFirstClubList" />
        <v-list class="py-0">
            <v-list-item-group id="club-list-group">
                <div id="club-list-sentinel" />
                <template v-for="club in clubList">
                    <ClubPost :key="club.seq"
                              :club="club"
                    />
                </template>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import ClubListSearchFilter from '@/views/clubList/components/club/ClubListSearchFilter.vue';
import ClubPost from '@/views/clubList/components/club/ClubPost.vue';
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
            isRequesting: false,
        };
    },
    computed: {
        clubList: () => gettersHelper.clubList(),
        clubPage: () => gettersHelper.clubPage(),
        isLastPage() {
            return this.clubPage.isLastPage;
        },
        isFirstPage() {
            return this.clubPage.nextPage === 0;
        },
    },
    mounted() {
        this.listGroup = document.querySelector('#club-list-group');
        this.sentinel = document.querySelector('#club-list-sentinel');
        if (_.isEmpty(this.clubList)) {
            this.initFirstClubList();
        } else {
            this.insertSentinel();
        }
        this.setInfiniteScrollObserver();
    },
    methods: {
        initFirstClubList() {
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
    },
};
</script>

<style scoped>

</style>
