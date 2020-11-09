<template>
    <div>
        <v-tabs v-model="tab"
                class="app-main-club-tab-header"
                centered
                grow
        >
            <v-tab v-for="menu in menus"
                   :key="menu.key"
                   :href="`#${menu.key}`"
            >
                {{ menu.name }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item value="club">
                <ClubListTab />
            </v-tab-item>
            <v-tab-item value="myClub">
                <MyClubListTab />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import goTo from 'vuetify/es5/services/goto';
import ClubListTab from '@/components/club/list/ClubListTab.vue';
import MyClubListTab from '@/components/club/list/MyClubListTab.vue';
import clubListTabStore from '@/utils/ClubListTabStore.js';

export default {
    name: 'ClubListMainTabs',
    components: { MyClubListTab, ClubListTab },
    data() {
        return {
            tab: null,
            menus: [
                { name: '전체 모임', key: 'club' },
                { name: '내모임', key: 'myClub' },
            ],
        };
    },
    watch: {
        tab() {
            clubListTabStore.save(this.tab);
        },
    },
    updated() {
        const { rememberPositionY } = this.$route.query;
        if (rememberPositionY) {
            goTo(rememberPositionY);
        }
    },
    created() {
        this.tab = clubListTabStore.get();
    },
};
</script>

<style scoped>

</style>
