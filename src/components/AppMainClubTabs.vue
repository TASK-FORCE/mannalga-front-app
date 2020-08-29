<template>
    <div>
        <v-tabs v-model="tab"
                centered
                grow
        >
            <v-tab
                v-for="menu in ['전체 모임', '내 모임']"
                :key="menu"
            >
                {{ menu }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <SearchCondition />
                <ClubList :meetingList="meetingList"
                          @addMeetingLists="addMeetingLists"
                />
            </v-tab-item>
            <v-tab-item>
                V2
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubList from '@/components/ClubList.vue';
import SearchCondition from '@/components/SearchCondition.vue';

export default {
    name: 'AppMainClubTabs',
    components: { SearchCondition, ClubList },
    data() {
        return {
            tab: null,
            meetingList: getMeetingList(0),
        };
    },
    methods: {
        addMeetingLists() {
            this.meetingList.push(...getMeetingList(0));
        },
    },
};
let req = 0;
function getMeetingList(size) {
    const list = [];
    for (let i = 0; i < size; i++) {
        list.push({ id: req, title: '코딩 스터디', location: '강동구', memberCount: 30 });
        req += 1;
    }
    return list;
}
</script>

<style scoped>

</style>
