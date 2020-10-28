<template>
    <div>
        <v-tabs v-model="tab"
                class="app-main-club-tab-header"
                centered
                grow
        >
            <v-tab v-for="menu in menus"
                   :key="menu"
            >
                {{ menu }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <ClubListTab />
            <MuClubListTab />
        </v-tabs-items>
    </div>
</template>

<script>
import goTo from 'vuetify/es5/services/goto';
import ClubListTab from '@/components/club/clubList/ClubListTab.vue';
import MuClubListTab from '@/components/club/clubList/MyClubListTab.vue';

export default {
    name: 'ClubListMainTabs',
    components: { MuClubListTab, ClubListTab },
    data() {
        return {
            tab: null,
            menus: ['전체 모임', '내 모임'],
        };
    },
    updated() {
        const { rememberPositionY } = this.$route.query;
        if (rememberPositionY) {
            goTo(rememberPositionY);
        }
    },
};
</script>

<style scoped>

</style>
