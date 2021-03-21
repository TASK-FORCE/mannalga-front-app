<template>
    <span
      :class="getMargin"
      class="grey--text"
    > |
    </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VerticalBarDivider',
  props: {
    margin: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    getMargin() {
      return `mx-${this.margin}`;
    },
  },
});
</script>

<style scoped>

</style>
