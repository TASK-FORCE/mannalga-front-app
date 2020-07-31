<template>
    <v-snackbar v-model="safeOpen"
                v-bind="{[snackBarOption.location]: true}"
    >
        {{ snackBarOption.message }}

        <template v-slot:action="{ attrs }">
            <v-btn
                :color="snackBarOption.color"
                text
                v-bind="attrs"
                @click="closeSnackBar"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'CommonSnackBar',
    computed: {
        ...mapGetters('common', ['snackBarOption']),
        safeOpen: {
            get() {
                return this.snackBarOption.open;
            },
            set() {
                this.closeSnackBar();
            },
        },
    },
    methods: {
        ...mapMutations('common', ['closeSnackBar']),
    },
};
</script>

<style scoped>

</style>
