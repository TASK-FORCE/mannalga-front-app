<template>
    <v-app-bar class="elevation-0"
               height="50px"
               app
    >
        <v-btn icon
               @click="$router.back()"
        >
            <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        <v-spacer />
        <span class="title">{{ title }}</span>
    </v-app-bar>
</template>

<script>
export default {
    name: 'CommonHeader',
    props: ['title'],
};
</script>

<style scoped>
.title {
    position: absolute;
    font-size: 1.1rem;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
