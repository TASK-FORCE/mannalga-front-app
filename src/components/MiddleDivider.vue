<template>
  <div
    class="divider"
    :style="{'height': `${height}px`}"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { isDarkTheme } from '@/utils/theme';

export default Vue.extend({
  name: 'MiddleDivider',
  props: {
    height: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      isDarkTheme: isDarkTheme(),
    };
  },
});
</script>

<style
  scoped
  lang="scss"
>
.divider {
  background-color: #F5F5F5;
}

.theme--dark {
  .divider {
    background-color: #292929;
  }
}
</style>
