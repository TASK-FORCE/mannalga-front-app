<template>
    <div class="text-center">
        <v-btn
            :outlined="!!outlined"
            :color="color || 'blue'"
            :loading="loading"
            :width="width"
            @click="$emit('click');"
        >
            {{ text }}
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
});
</script>

<style scoped>

</style>
