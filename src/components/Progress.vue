<template>
  <v-progress-circular
    class="absolute-center"
    indeterminate
    color="red"
    :size="50"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Progress',
});
</script>

<style scoped>
</style>
