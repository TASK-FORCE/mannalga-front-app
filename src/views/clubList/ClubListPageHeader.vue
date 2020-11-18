<template>
    <v-app-bar
        class="elevation-0 app-main-header"
        app
    >
        <v-text-field class="club-search-bar"
                      placeholder="모임 검색"
                      prepend-icon="mdi-magnify"
        />

        <v-spacer />

        <v-btn icon
               large
               class="mr-1"
               @click="changeTheme"
        >
            <v-icon v-if="isThemeDark">mdi-water</v-icon>
            <v-icon v-else>mdi-water-outline</v-icon>
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
            clubSearchPagePath: PATH.CLUB.SEARCH,
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

<style lang="scss"
       scoped
>
.v-toolbar__content {
    padding: 0 !important;
}
</style>
