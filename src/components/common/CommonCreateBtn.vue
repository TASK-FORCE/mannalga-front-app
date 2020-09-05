<template>
    <v-btn class="create-btn v-btn--fab darken-2"
           :to="path"
           :color="color || 'green'"
    >
        <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'CommonCreateBtn',
    props: {
        color: String,
        path: String,
    },
};
</script>

<style scoped>
.create-btn {
    position: fixed;
    border-radius: 50%;
    width: 50px !important;
    height: 50px !important;
    min-width: auto !important;
    z-index: 4;
    right: 16px;
    bottom: 25px;
}
</style>
