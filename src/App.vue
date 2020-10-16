<template>
    <v-app>
        <v-main>
            <transition name="component-fade"
                        mode="out-in"
            >
                <router-view :key="$route.fullPath" />
            </transition>
        </v-main>
        <CommonProgress v-show="isLoading" />
        <CommonSnackBar />
    </v-app>
</template>

<script>
import CommonSnackBar from '@/components/common/CommonSnackBar.vue';
import CommonProgress from '@/components/common/CommonProgress.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';

export default {
    name: 'App',
    components: { CommonProgress, CommonSnackBar },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        this.$vuetify.theme.dark = localStorage.getItem('themeDark') === 'true';
    },
};
</script>
