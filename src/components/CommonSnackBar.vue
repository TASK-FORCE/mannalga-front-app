<template>
    <SnackBar
        :open="open"
        :snackBarOptions="snackBarOptions"
        btnText="닫기"
        @click="close"
        @input="value => !value ? close() : null"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import SnackBar from '@/components/SnackBar.vue';
import { MutationTypes } from '@/store/type/methodTypes';
import { SnackBarOption } from '@/interfaces/common';

export default Vue.extend({
    name: 'CommonSnackBar',
    components: { SnackBar },
    data() {
        return {
            open: false,
        };
    },
    computed: {
        snackBarOptions(): SnackBarOption {
            return this.$store.state.common.snackBarOptions;
        }
    },
    watch: {
        snackBarOptions(value) {
            this.open = value.open;
        },
    },
    methods: {
        close() {
            this.$store.commit(MutationTypes.CLOSE_SNACK_BAR);
        },
    },
});
</script>

<style scoped>

</style>
