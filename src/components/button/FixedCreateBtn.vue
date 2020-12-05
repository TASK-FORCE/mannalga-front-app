<template>
    <v-btn class="v-btn--fab darken-2"
           :class="left ? 'left-btn' : 'right-btn'"
           :to="path"
           :color="color || 'green'"
    >
        <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: 'FixedCreateBtn',
    props: {
        color: String,
        path: String,
        left: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.right-btn {
    position: fixed;
    border-radius: 50%;
    width: 50px !important;
    height: 50px !important;
    min-width: auto !important;
    z-index: 4;
    right: 16px;
    bottom: 10px;
}

.left-btn {
    position: fixed;
    border-radius: 50%;
    width: 50px !important;
    height: 50px !important;
    min-width: auto !important;
    z-index: 4;
    left: 16px;
    bottom: 10px;
}
</style>
