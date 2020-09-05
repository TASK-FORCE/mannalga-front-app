<template>
    <div>
        <v-tabs v-model="tab"
                class="app-main-club-tab-header"
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
                <SearchFilterMain />
                <ClubList :meetingList="meetingList"
                          :needFetching="true"
                          @addMeetingList="addMeetingList"
                />
            </v-tab-item>
            <v-tab-item>
                <ClubList :meetingList="myMeetingList" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import ClubList from '@/components/ClubList.vue';
import SearchFilterMain from '@/components/search/SearchFilterMain.vue';
import { TEMP_TIMEOUT } from '@/utils/constant/constant.js';

export default {
    name: 'AppMainClubTabs',
    components: { SearchFilterMain, ClubList },
    data() {
        return {
            tab: null,
            meetingList: getMeetingList(10),
            myMeetingList: getMeetingList(10),
        };
    },
    methods: {
        async addMeetingList() {
            await new Promise(r => setTimeout(r, TEMP_TIMEOUT));
            this.meetingList.push(...getMeetingList(10));
        },
    },
};

let seq = 0;

function getMeetingList(size) {
    const list = [];
    for (let i = 0; i < size; i++) {
        list.push({ id: seq, title: '코딩 스터디', location: '강동구', memberCurCount: 10, memberMaxCount: 30 });
        seq += 1;
    }
    return list;
}
</script>

<style scoped>

</style>
