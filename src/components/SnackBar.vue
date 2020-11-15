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
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';

export default {
    name: 'SnackBar',
    computed: {
        snackBarOptions: () => gettersHelper.snackBarOptions(),
        openSnackBar: () => gettersHelper.openSnackBar(),
        safeOpen: {
            get() {
                return this.openSnackBar;
            },
            set() {
                this.closeSnackBar();
            },
        },
    },
    methods: {
        closeSnackBar: () => mutationsHelper.closeSnackBar(),
    },
};
</script>

<style scoped>

</style>
