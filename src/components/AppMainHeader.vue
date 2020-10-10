<template>
    <v-app-bar
        color="white"
        class="elevation-0 app-main-header"
        app
    >
        <v-btn icon
               large
               class="mr-2 ml-2"
        >
            <v-icon left>
                mdi-bell-outline
            </v-icon>
        </v-btn>
        <v-spacer />

        <v-btn to="/search"
               class="mr-1"
               icon
        >
            <v-icon right>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon
               large
               class="mr-1"
               @click="moveToUserSettings"
        >
            <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { USER_SETTINGS_PATH } from '@/router/route_path_type.js';

export default {
    name: 'AppMainHeader',
    methods: {
        moveToUserSettings() {
            this.$router.push(USER_SETTINGS_PATH);
        },
    },
};
</script>

<style scoped>
.v-toolbar__content {
    padding: 0 !important;
}
</style>
