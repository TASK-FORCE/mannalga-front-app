<template>
    <v-snackbar v-model="safeOpen"
                v-bind="{[snackBarOptions.location]: true}"
                :timeout="snackBarOptions.time"
    >
        {{ snackBarOptions.message }}

        <template v-slot:action="{ attrs }">
            <v-btn
                :color="snackBarOptions.color"
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
import { mapGetters, mapMutations } from 'vuex';
import { CLOSE_SNACKBAR, COMMON, SNACKBAR_OPTIONS } from '@/store/type/common_type.js';

export default {
    name: 'CommonSnackBar',
    computed: {
        ...mapGetters(COMMON, { snackBarOptions: SNACKBAR_OPTIONS }),
        safeOpen: {
            get() {
                return this.snackBarOptions.open;
            },
            set() {
                this[CLOSE_SNACKBAR]();
            },
        },
    },
    methods: {
        ...mapMutations(COMMON, { closeSnackBar: CLOSE_SNACKBAR }),
    },
};
</script>

<style scoped>

</style>
