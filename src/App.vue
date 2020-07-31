<template>
    <v-app>
        <v-main>
            <transition name="component-fade"
                        mode="out-in"
            >
                <router-view :key="$route.fullPath" />
            </transition>
        </v-main>
        <BaseProgress v-show="isLoading" />
    </v-app>
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    components: { BaseProgress },
    computed: {
        ...mapGetters('common', ['isLoading']),
    },
};
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .15s ease;
}

.component-fade-enter, .component-fade-leave-to {
    opacity: 0;
}

.absolute-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.mt-30 {
    margin-top: 30%;
}

.mt-40 {
    margin-top: 40%;
}
</style>
