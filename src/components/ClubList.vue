<template>
    <v-list class="pt-0">
        <v-list-item-group id="list-group"
                           active-class="pink--text"
        >
            <div id="sentinel">
            </div>
            <template v-for="(meeting, index) in meetingList">
                <ClubPost :key="index"
                          :class="`post-${index}`"
                          :meeting="meeting"
                />
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script>
import ClubPost from '@/components/ClubPost.vue';

export default {
    name: 'ClubList',
    components: { ClubPost },
    props: ['meetingList'],
    data() {
        return {
            sentinel: null,
            listGroup: null,
        };
    },
    mounted() {
        this.sentinel = document.querySelector('#sentinel');
        this.listGroup = document.querySelector('#list-group');
        const infinityScrollCallback = entries => {
            entries.forEach(async entry => {
                if (entry.isIntersecting && entry.target === this.sentinel) {
                    await this.tempFunc();
                    const childrenLength = this.listGroup.children.length;
                    this.listGroup.insertBefore(this.sentinel, this.listGroup.children[childrenLength - 1]);
                }
            });
        };
        const observer = new IntersectionObserver(infinityScrollCallback, { threshold: 0.75 });
        observer.observe(this.sentinel);
    },
    methods: {
        getCurrentSentinelElement() {
            const lastPostClass = `.post-${this.meetingList.length - 1}`;
            return document.querySelector(lastPostClass);
        },
        async tempFunc() {
            this.$emit('addMeetingLists');
            await new Promise(r => setTimeout(r, 500));
        },
    },
};

</script>

<style scoped>

</style>
