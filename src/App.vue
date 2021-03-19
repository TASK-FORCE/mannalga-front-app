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

<script lang="ts">
import CommonSnackBar from '@/components/CommonSnackBar.vue';
import Progress from '@/components/Progress.vue';
import { loadCurrentTheme } from '@/plugins/vuetify.js';
import { CommonMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'App',
    components: { CommonSnackBar, Progress },
    data() {
        return {
            isDevEnv: process.env.NODE_ENV !== 'production',
        };
    },
    mounted() {
        loadCurrentTheme();
    },
    methods: {
        changeTheme() {
            this.$store.commit(CommonMutationTypes.CHANGE_THEME);
        },
    },
});
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
