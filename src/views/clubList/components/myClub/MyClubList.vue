<template>
    <div>
        <v-list id="list-wrapper"
                class="py-0"
        >
            <v-list-item-group id="my-club-list-group"
                               active-class="pink--text"
            >
                <div id="my-club-list-sentinel" />
                <template v-for="myClubContext in myClubContextList">
                    <MyClubPost :key="myClubContext.seq"
                                :myClubContext="myClubContext"
                    />
                </template>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import MyClubPost from '@/views/clubList/components/myClub/MyClubPost.vue';

export default {
    name: 'MyClubList',
    components: { MyClubPost },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            isRequesting: false,
        };
    },
    computed: {
        myClubContextList: () => gettersHelper.myClubList(),
        myClubPage: () => gettersHelper.myClubPage(),
        isLastPage() {
            return this.myClubPage.isLastPage;
        },
        isFirstPage() {
            return this.myClubPage.nextPage === 0;
        },
    },
    mounted() {
        this.listGroup = document.querySelector('#my-club-list-group');
        this.sentinel = document.querySelector('#my-club-list-sentinel');
        this.setInfiniteScrollObserver();
        if (_.isEmpty(this.myClubContextList)) {
            actionsHelper.requestFirstMyClubList().then(() => this.insertSentinel());
        }
    },
    methods: {
        moveSentinel() {
            this.insertSentinel();
            this.isRequesting = false;
        },
        setInfiniteScrollObserver() {
            const infiniteScrollCallback = entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target === this.sentinel && this.canRequest()) {
                        this.isRequesting = true;
                        actionsHelper.requestNextMyClubList().then(() => this.moveSentinel());
                    }
                });
            };
            const observer = new IntersectionObserver(infiniteScrollCallback, { threshold: 0.75 });
            observer.observe(this.sentinel);
        },
        insertSentinel() {
            this.listGroup.insertBefore(this.sentinel, this.listGroup.children[this.listGroup.children.length - 2]);
        },
        canRequest() {
            return !this.isRequesting && !this.isLastPage && !this.isFirstPage;
        },
    },
};
</script>

<style scoped>

</style>
