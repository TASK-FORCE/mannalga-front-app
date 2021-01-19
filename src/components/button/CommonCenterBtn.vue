<template>
    <div class="text-center">
        <v-btn :outlined="!!outlined"
               :color="color || 'blue'"
               :loading="loading"
               :width="width"
               @click="$emit('click');"
        >
            {{ text }}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'CommonCenterBtn',
    props: {
        text: {
            type: String,
            default: 'click',
        },
        color: {
            type: String,
            default: 'blue',
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
        },
    },
};
</script>

<style scoped>

</style>
