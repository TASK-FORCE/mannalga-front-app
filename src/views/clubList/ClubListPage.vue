<template>
    <v-container class="pb-0">
        <ClubListPageHeader />
        <ClubListPageBody />
    </v-container>
</template>

<script>
import ClubListPageHeader from '@/views/clubList/ClubListPageHeader.vue';
import ClubListPageBody from '@/views/clubList/ClubListPageBody.vue';

export default {
    name: 'ClubListPage',
    components: { ClubListPageHeader, ClubListPageBody },
};
</script>

<style scoped>

</style>
