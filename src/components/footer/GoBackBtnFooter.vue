<template>
  <v-footer
    fixed
    app
    class="pa-0"
  >
    <v-bottom-navigation
      class="text-center pa-0"
      grow
      horizontal
    >
      <v-btn
        v-show="!safeHideBackBtn"
        @click="$router.back()"
      >
        <v-icon
          x-large
          v-text="'$arrowLeftBold'"
        />
      </v-btn>
      <v-btn
        v-show="!safeHideGoBtn"
        @click="$emit('clickGoBtn')"
      >
        <v-icon
          x-large
          v-text="'$arrowRightBold'"
        />
      </v-btn>
    </v-bottom-navigation>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GoBackBtnFooter',
  props: {
    hideBackBtn: Boolean,
    hideGoBtn: Boolean,
  },
  computed: {
    safeHideBackBtn() {
      return !!this.hideBackBtn;
    },
    safeHideGoBtn() {
      return !!this.hideGoBtn;
    },
  },
});
</script>

<style scoped>

</style>
