<template>
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
</template>

<script>
import MyClubPost from '@/components/clubList/MyClubPost.vue';
import { GET_DEFAULT_PAGE } from '@/store/type/club_list_type.js';

export default {
    name: 'MyClubList',
    components: { MyClubPost },
    props: {
        page: {
            type: Object,
            default: () => GET_DEFAULT_PAGE(),
        },
        myClubContextList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            sentinel: null,
            listGroup: null,
            isRequesting: false,
        };
    },
    computed: {
        isLastPage() {
            return this.page.isLastPage;
        },
        isFirstPage() {
            return this.page.nextPage === 0;
        },
    },
    mounted() {
        this.listGroup = document.querySelector('#my-club-list-group');
        this.sentinel = document.querySelector('#my-club-list-sentinel');
        this.setInfiniteScrollObserver();
        this.$emit('findFirstPage', this.insertSentinel);
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
                        this.$emit('findNextPage', this.moveSentinel);
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
