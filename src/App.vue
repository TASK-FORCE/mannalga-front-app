<template>
    <v-app>
        <v-main>
            <transition name="component-fade"
                        mode="out-in"
            >
                <router-view :key="$route.fullPath" />
            </transition>
        </v-main>
        <MainProgress v-show="isLoading" />
        <MainSnackBar />
    </v-app>
</template>

<script>
import MainSnackBar from '@/components/ui/MainSnackBar.vue';
import MainProgress from '@/components/ui/MainProgress.vue';
import { loadCurrentTheme } from '@/plugins/vuetify.js';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'App',
    components: { MainProgress, MainSnackBar },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        loadCurrentTheme();
    },
};
</script>
