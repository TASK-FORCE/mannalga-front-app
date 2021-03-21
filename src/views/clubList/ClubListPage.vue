<template>
    <v-container class="pa-0">
        <ClubListPageHeader />
        <ClubListPageBody />
    </v-container>
</template>

<script lang="ts">
import ClubListPageHeader from '@/views/clubList/ClubListPageHeader.vue';
import ClubListPageBody from '@/views/clubList/ClubListPageBody.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'ClubListPage',
    components: { ClubListPageHeader, ClubListPageBody },
});
</script>

<style scoped>

</style>
