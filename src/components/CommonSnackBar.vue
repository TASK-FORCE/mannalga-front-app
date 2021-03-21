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
import { UIMutationTypes } from '@/store/type/mutationTypes';
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
      return this.$store.state.ui.snackBarOptions;
    }
  },
  watch: {
    snackBarOptions(value) {
      this.open = value.open;
    },
  },
  methods: {
    close() {
      this.$store.commit(UIMutationTypes.CLOSE_SNACK_BAR);
    },
  },
});
</script>

<style scoped>

</style>
