<template>
    <SnackBar :open="open"
              :snackBarOptions="snackBarOptions"
              btnText="닫기"
              @click="close"
              @input="value => !value ? close() : null"
    />
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import SnackBar from '@/components/SnackBar.vue';

export default {
    name: 'CommonSnackBar',
    components: { SnackBar },
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
