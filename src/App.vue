<template>
    <v-app>
        <v-main>
            <transition
                name="component-fade"
                mode="out-in"
            >
                <router-view
                    :key="$route.fullPath"
                    class="app-body"
                />
            </transition>
        </v-main>
        <Progress v-show="$store.state.common.loading" />
        <CommonSnackBar />
        <v-btn
            v-if="isDevEnv"
            class="temp-btn"
            fab
            color="red"
            x-small
            @click="changeTheme"
        >
            <v-icon
                class="white--text"
                v-text="'$plus'"
            />
        </v-btn>
    </v-app>
</template>

<script>
import CommonSnackBar from '@/components/CommonSnackBar.vue';
import Progress from '@/components/Progress.vue';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import { changeThemeAndLoad } from '@/plugins/vuetify.js';
import { MutationTypes } from '@/store/type/methodTypes.ts';

export default {
    name: 'App',
    components: { CommonSnackBar, Progress },
    data() {
        return {
            isDevEnv: process.env.NODE_ENV !== 'production',
        };
    },
    created() {
        changeThemeAndLoad();
    },
    mounted() {
        this.$store.commit(MutationTypes.CHANGE_THEME);
    },
    methods: {
        changeTheme() {
            this.$store.commit(MutationTypes.CHANGE_THEME);
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
