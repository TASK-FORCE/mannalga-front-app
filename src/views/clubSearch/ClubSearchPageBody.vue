<template>
  <div>
    <v-text-field
      class="club-search-bar mx-3 mt-3"
      label="모임 검색"
      prepend-icon="$search"
    />

    <ClubListSearchFilter />
  </div>
</template>

<script lang="ts">
import ClubListSearchFilter from '@/views/clubList/components/ClubListSearchFilter.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'ClubSearchPageBody',
  components: { ClubListSearchFilter },
});
</script>

<style scoped>
</style>
