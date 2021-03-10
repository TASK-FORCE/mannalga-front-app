<template>
    <v-app>
        <v-main>
            <transition name="component-fade"
                        mode="out-in"
            >
                <router-view :key="$route.fullPath"
                             class="app-body"
                />
            </transition>
        </v-main>
        <Progress v-show="isLoading" />
        <CommonSnackBar />
        <v-btn class="temp-btn"
               fab
               color="red"
               x-small
               @click="changeTheme"
        >
            <v-icon class="white--text"
                    v-text="'$plus'"
            />
        </v-btn>
    </v-app>
</template>

<script>
import CommonSnackBar from '@/components/CommonSnackBar.vue';
import Progress from '@/components/Progress.vue';
import { changeThemeAndLoad, loadCurrentTheme } from '@/plugins/vuetify.js';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'App',
    components: { CommonSnackBar, Progress },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        loadCurrentTheme();
    },
    methods: {
        changeTheme() {
            changeThemeAndLoad();
        },
    },
};
</script>

<style>
.temp-btn {
    position: fixed;
    border-radius: 50%;
    min-width: auto !important;
    z-index: 4;
    right: 8px;
    bottom: 10%;
}
</style>
