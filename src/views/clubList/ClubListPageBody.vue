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

        <v-tabs-items v-model="tab"
                      class="pa-2"
        >
            <v-tab-item value="club">
                <ClubList />
            </v-tab-item>
            <v-tab-item value="myClub">
                <MyClubList />
            </v-tab-item>
        </v-tabs-items>
        <FixedCreateBtn :path="clubCreatePath"
                        color="blue"
        />
        <FixedScrollToTopBtn color="red" />
    </div>
</template>

<script>
import goTo from 'vuetify/es5/services/goto';
import ClubList from '@/views/clubList/components/club/ClubList.vue';
import MyClubList from '@/views/clubList/components/myClub/MyClubList.vue';
import clubListTabStore from '@/utils/ClubListTabStore.js';
import FixedCreateBtn from '@/components/button/FixedCreateBtn.vue';
import FixedScrollToTopBtn from '@/components/button/FixedScrollToTopBtn.vue';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubListPageBody',
    components: { FixedScrollToTopBtn, FixedCreateBtn, MyClubList, ClubList },
    data() {
        return {
            clubCreatePath: PATH.CLUB.CREATE,
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
