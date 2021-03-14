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
        <v-btn
            v-if="isDevEnv"
            class="temp-btn"
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
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { changeThemeAndLoad } from '@/plugins/vuetify.js';

export default {
    name: 'App',
    components: { CommonSnackBar, Progress },
    data() {
        return {
            isDevEnv: process.env.NODE_ENV !== 'production',
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        changeThemeAndLoad();
    },
    mounted() {
        mutationsHelper.changeTheme();
    },
    methods: {
        changeTheme() {
            mutationsHelper.changeTheme();
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
