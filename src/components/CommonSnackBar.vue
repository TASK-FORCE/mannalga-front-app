<template>
    <SnackBar :open="safeOpen"
              :snackBarOptions="snackBarOptions"
              btnText="닫기"
              @click="safeOpen.set()"
    />
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import SnackBar from '@/components/SnackBar.vue';

export default {
    name: 'CommonSnackBar',
    components: { SnackBar },
    computed: {
        snackBarOptions: () => gettersHelper.snackBarOptions(),
        openSnackBar: () => gettersHelper.openSnackBar(),
        safeOpen: {
            get() {
                return this.openSnackBar;
            },
            set() {
                mutationsHelper.closeSnackBar();
            },
        },
    },
};
</script>

<style scoped>

</style>
