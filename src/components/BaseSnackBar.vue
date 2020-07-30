<template>
    <v-snackbar v-model="open"
                v-bind="safeLocation"
    >
        {{ message }}

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
        message: String,
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
