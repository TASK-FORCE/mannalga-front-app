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
import { mapGetters } from 'vuex';
import CommonSnackBar from '@/components/common/CommonSnackBar.vue';
import CommonProgress from '@/components/common/CommonProgress.vue';
import { COMMON, IS_LOADING } from '@/store/type/common_type.js';

export default {
    name: 'App',
    components: { CommonProgress, CommonSnackBar },
    computed: {
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
    },
};
</script>
