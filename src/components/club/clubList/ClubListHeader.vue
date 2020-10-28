<template>
    <v-app-bar
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
        <v-btn icon
               large
               class="mr-1"
               @click="changeTheme"
        >
            <v-icon v-if="themeDark">mdi-water</v-icon>
            <v-icon v-else>mdi-water-outline</v-icon>
        </v-btn>

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
import { changeVuetifyTheme, isVuetifyThemeDark } from '@/plugins/vuetify.js';

export default {
    name: 'ClubListHeader',
    data() {
        return {
            themeDark: isVuetifyThemeDark(),
        };
    },
    methods: {
        moveToUserSettings() {
            this.$router.push(USER_SETTINGS_PATH);
        },
        changeTheme() {
            changeVuetifyTheme();
            this.themeDark = isVuetifyThemeDark();
        },
    },
};
</script>

<style scoped>
.v-toolbar__content {
    padding: 0 !important;
}
</style>
