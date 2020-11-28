<template>
    <div>
        <v-text-field class="club-search-bar mx-3 mt-3"
                      label="모임 검색"
                      prepend-icon="mdi-magnify"
        />

        <ClubListSearchFilter />
    </div>
</template>

<script>
import ClubListSearchFilter from '@/views/clubList/components/ClubListSearchFilter.vue';

export default {
    name: 'ClubSearchPageBody',
    components: { ClubListSearchFilter },
};
</script>

<style scoped>
</style>
