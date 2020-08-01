<template>
    <v-app>
        <v-main>
            <transition name="component-fade"
                        mode="out-in"
            >
                <router-view :key="$route.fullPath"/>
            </transition>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
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
</style>
