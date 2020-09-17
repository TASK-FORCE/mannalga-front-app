<template>
    <v-list id="list-wrapper"
            class="py-0"
    >
        <v-list-item-group id="list-group"
                           active-class="pink--text"
        >
            <template v-for="club in clubList">
                <ClubPost :key="club.seq"
                          :club="club"
                />
            </template>
            <div id="sentinel"/>
        </v-list-item-group>
    </v-list>
</template>

<script>
import ClubPost from '@/components/ClubPost.vue';
import { CAN_REQUEST_NEXT_PAGE, CLUB_LIST_MODULE } from '@/store/type/club_list_type.js';
import { mapGetters } from 'vuex';

export default {
    name: 'ClubList',
    components: { ClubPost },
    props: ['page', 'clubList'],
    data() {
        return {
            sentinel: null,
            listGroup: null,
        };
    },
    computed: {
        ...mapGetters(CLUB_LIST_MODULE, [CAN_REQUEST_NEXT_PAGE]),
    },
    mounted() {
        this.listGroup = document.querySelector('#list-group');
        this.sentinel = document.querySelector('#sentinel');
        this.setInfiniteScrollObserver();
    },
    methods: {
        moveSentinel() {
            this.listGroup.insertBefore(this.sentinel, this.listGroup.children[this.listGroup.children.length - 2]);
        },
        setInfiniteScrollObserver() {
            const infiniteScrollCallback = entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target === this.sentinel && this[CAN_REQUEST_NEXT_PAGE]) {
                        this.$emit('findNextPage', this.moveSentinel);
                    }
                });
            };
            const observer = new IntersectionObserver(infiniteScrollCallback, { threshold: 0.75 });
            observer.observe(this.sentinel);
        },
    },
};
</script>

<style scoped>

</style>
