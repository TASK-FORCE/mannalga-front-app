<template>
    <v-app-bar
        class="elevation-0"
        app
    >
        <v-btn icon
               @click="$router.back()"
        >
            <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <h3 class="header-club-name">{{ clubName }}</h3>
        <v-spacer></v-spacer>

        <v-btn icon
               class="d-block"
        >
            <v-icon>mdi-heart</v-icon> <!-- @TODO 사용자 관심여부에 따른 아이콘 처리 -->
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>mdi-cogs</v-icon> <!-- @TODO 사용자 가입여부에 따른 아이콘 처리 -->
        </v-btn>
    </v-app-bar>
</template>

<script>
import { gettersHelper } from '@/store/helper/gettersHelper.js';

export default {
    name: 'ClubMainHeader',
    computed: {
        clubName: () => gettersHelper.clubName(),
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
