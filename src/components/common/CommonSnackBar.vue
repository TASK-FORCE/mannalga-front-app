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
import { getterHelper } from '@/store/helper/getterHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

export default {
    name: 'CommonSnackBar',
    computed: {
        snackBarOptions: () => getterHelper.snackBarOptions(),
        safeOpen: {
            get() {
                return this.snackBarOptions.open;
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
