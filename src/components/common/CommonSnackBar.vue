<template>
    <v-snackbar v-model="safeOpen"
                v-bind="{[snackBarOption.location]: true}"
                :timeout="snackBarOption.time"
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
        calculateWidth() {
            if (window.innerWidth < 370) {
                return window.innerWidth - (window.innerWidth / 10);
            }
            return 375;
        },
    },
};
</script>

<style scoped>

</style>
