<template>
    <div>
        <ClubDetailPageHeader />
        <ClubDetailPageBody />
    </div>
</template>

<script lang="ts">
import ClubDetailPageHeader from '@/views/clubDetail/ClubDetailPageHeader.vue';
import ClubDetailPageBody from '@/views/clubDetail/ClubDetailPageBody.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'ClubDetailPage',
    components: { ClubDetailPageHeader, ClubDetailPageBody },
});
</script>
