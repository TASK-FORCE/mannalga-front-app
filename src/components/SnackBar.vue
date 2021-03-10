<template>
    <v-snackbar :value="open"
                v-bind="{[snackBarOptions.location]: true}"
                :timeout="snackBarOptions.time"
                @input="value => $emit('input', value)"
    >
        {{ snackBarOptions.message }}

        <template v-slot:action="{ attrs }">
            <v-btn
                :color="snackBarOptions.color"
                outlined
                small
                v-bind="attrs"
                @click="$emit('click')"
            >
                {{ btnText }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>

export default {
    name: 'SnackBar',
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        snackBarOptions: {
            type: Object,
            required: true,
        },
        btnText: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>

</style>
