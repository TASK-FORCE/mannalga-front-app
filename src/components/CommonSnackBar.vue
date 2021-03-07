<template>
    <v-snackbar v-model="open"
                v-bind="{[snackBarOptions.location]: true}"
                :timeout="snackBarOptions.time"
    >
        {{ snackBarOptions.message }}

        <template v-slot:action="{ attrs }">
            <v-btn
                :color="snackBarOptions.color"
                outlined
                small
                v-bind="attrs"
                @click="close"
            >
                닫기
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';

export default {
    name: 'CommonSnackBar',
    data() {
        return {
            open: false,
        };
    },
    computed: {
        snackBarOptions: () => gettersHelper.snackBarOptions(),
    },
    watch: {
        snackBarOptions(value) {
            this.open = value.open;
        },
        open(value) {
            if (value === false) {
                this.close();
            }
        },
    },
    methods: {
        close() {
            mutationsHelper.closeSnackBar();
        },
    },
};
</script>

<style scoped>

</style>
