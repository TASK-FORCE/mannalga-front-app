<template>
    <v-snackbar v-model="open"
                v-bind="safeLocation"
    >
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                :color="safeColor"
                text
                v-bind="attrs"
                @click="$emit('close')"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: 'BaseSnackBar',
    props: {
        open: Boolean,
        text: String,
        color: String,
        location: String,
    },
    computed: {
        safeLocation() {
            const location = this.location ? this.location : 'bottom';
            return { [location]: true };
        },
        safeColor() {
            return this.color ? this.color : 'pink';
        },
    },
};
</script>

<style scoped>

</style>
