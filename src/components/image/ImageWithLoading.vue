<template>
    <v-img
        :src="imgUrl"
        class="grey lighten-2"
        :max-height="height"
        :aspect-ratio="aspectRatio"
        @click="$emit('click')"
    >
        <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
                <v-progress-circular indeterminate
                                     color="grey lighten-5"
                ></v-progress-circular>
            </v-row>
        </template>
    </v-img>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ImageWithLoading',
    props: {
        imgUrl: {
            type: String,
            required: true,
        },
        aspectRatio: String,
        height: Number,
    },
});
</script>

<style scoped>
</style>
