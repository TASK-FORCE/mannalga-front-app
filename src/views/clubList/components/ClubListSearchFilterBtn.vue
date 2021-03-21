<template>
  <v-btn
    class="btn"
    small
    text
    v-bind="attrs"
    v-on="on"
    @click="$emit('click')"
  >
    {{ text }}
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ClubListSearchFilterBtn',
  props: ['attrs', 'on', 'text'],
});
</script>

<style scoped>
.btn {
  border-radius: 30px;
  color: #9F9F9F;
  background-color: #FFFFFF;
}

.theme--dark .btn {
  background-color: #121212;
}
</style>
