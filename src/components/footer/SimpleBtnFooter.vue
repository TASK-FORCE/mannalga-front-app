<template>
    <v-footer fixed
              app
              class="pa-0"
    >
        <v-bottom-navigation class="text-center pa-0"
                             grow
                             horizontal
        >
            <v-btn class="simple-btn-footer"
                   :loading="loading"
                   @click="$emit('click')"
            >
                {{ text }}
            </v-btn>
        </v-bottom-navigation>
    </v-footer>
</template>

<script>
export default {
    name: 'SimpleBtnFooter',
    props: {
        text: {
            type: String,
            default: 'CLICK',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.simple-btn-footer {
    max-width: none !important;
    width: 100% !important;
    padding: 0 !important;
    font-size: 18px !important;
    font-weight: bold;
}
</style>
