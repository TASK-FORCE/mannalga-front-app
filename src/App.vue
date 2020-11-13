<template>
    <v-app>
        <v-main>
            <transition name="component-fade"
                        mode="out-in"
            >
                <router-view :key="$route.fullPath" />
            </transition>
        </v-main>
        <Progress v-show="isLoading" />
        <SnackBar />
    </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar.vue';
import Progress from '@/components/Progress.vue';
import { loadCurrentTheme } from '@/plugins/vuetify.js';
import gettersHelper from '@/store/helper/GettersHelper.js';

export default {
    name: 'App',
    components: { SnackBar, Progress },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        loadCurrentTheme();
    },
};
</script>
