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
            <v-icon v-if="isThemeDark">mdi-water</v-icon>
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
import { changeThemeAndLoad, isCurrentThemeDark } from '@/plugins/vuetify.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubListPageHeader',
    data() {
        return {
            isThemeDark: isCurrentThemeDark(),
        };
    },
    methods: {
        moveToUserSettings() {
            this.$router.push(PATH.USER.SETTINGS);
        },
        changeTheme() {
            changeThemeAndLoad();
            this.isThemeDark = isCurrentThemeDark();
        },
    },
};
</script>

<style scoped>
.v-toolbar__content {
    padding: 0 !important;
}
</style>
