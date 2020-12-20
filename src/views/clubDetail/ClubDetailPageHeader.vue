<template>
    <v-app-bar class="elevation-0"
               app
    >
        <v-btn icon
               @click="moveToClubListPage"
        >
            <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h3 class="header-club-name">{{ clubName }}</h3>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-cogs</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import { PATH } from '@/router/route_path_type.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.js';
import scrollHelper from '@/utils/ScrollHelper.js';
import clubTabStore from '@/utils/ClubTabStore.js';
import routerHelper from '@/router/RouterHelper.js';

export default {
    name: 'ClubDetailPageHeader',
    data() {
        return {
            clubListPath: PATH.CLUB_LIST,
        };
    },
    computed: {
        clubName: () => gettersHelper.clubName(),
    },
    methods: {
        moveToClubListPage() {
            scrollHelper.init(this.$route.fullPath);
            clubTabStore.save(routerHelper.clubSeq(), 'main');
            this.$router.push(this.clubListPath);
            clubDetailVuexService.reset();
        },
    },
};
</script>

<style scoped>
.header-club-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
