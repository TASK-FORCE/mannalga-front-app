<template>
    <v-list id="list-wrapper"
            class="py-0"
    >
        <v-list-item-group id="list-group"
                           active-class="pink--text"
        >
            <div id="sentinel">
            </div>
            <template v-for="(meeting, index) in meetingList">
                <ClubPost :key="index"
                          :meeting="meeting"
                />
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script>
import ClubPost from '@/components/ClubPost.vue';
import { TEMP_TIMEOUT } from '@/utils/constant/constant.js';

export default {
    name: 'ClubList',
    components: { ClubPost },
    props: ['meetingList', 'needFetching'],
    data() {
        return {
            sentinel: null,
            listGroup: null,
            fetching: false,
        };
    },
    mounted() {
        if (!this.needFetching) {
            return;
        }

        this.sentinel = document.querySelector('#sentinel');
        this.listGroup = document.querySelector('#list-group');
        if (this.meetingList.length > 0) {
            this.listGroup.insertBefore(this.sentinel, this.listGroup.children[this.listGroup.children.length - 2]);
        }
        const infiniteScrollCallback = entries => {
            entries.forEach(async entry => {
                if (entry.isIntersecting && entry.target === this.sentinel && !this.fetching) {
                    this.fetching = true;
                    await this.fetchPosts();
                    const childrenLength = this.listGroup.children.length;
                    this.listGroup.insertBefore(this.sentinel, this.listGroup.children[childrenLength - 2]);
                    this.fetching = false;
                }
            });
        };
        const observer = new IntersectionObserver(infiniteScrollCallback, { threshold: 0.75 });
        observer.observe(this.sentinel);
    },
    methods: {
        async fetchPosts() {
            this.$emit('addMeetingList');
            await new Promise(r => setTimeout(r, TEMP_TIMEOUT));
        },
    },
};
</script>

<style scoped>

</style>
