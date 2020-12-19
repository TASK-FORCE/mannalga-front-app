<template>
    <v-app-bar class="elevation-0"
               app
    >
        <v-btn icon
               @click="$router.back()"
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

export default {
    name: 'ClubDetailPageHeader',
    computed: {
        clubName: () => gettersHelper.clubName(),
    },
    methods: {
        pushToAppMain() {
            this.$router.push(PATH.CLUB_LIST);
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
