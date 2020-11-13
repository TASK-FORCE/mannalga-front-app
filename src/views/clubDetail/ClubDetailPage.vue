<template>
    <div>
        <ClubDetailPageHeader />
        <ClubDetailPageBody />
    </div>
</template>

<script>
import ClubDetailPageHeader from '@/views/clubDetail/ClubDetailPageHeader.vue';
import ClubDetailPageBody from '@/views/clubDetail/ClubDetailPageBody.vue';

export default {
    name: 'ClubDetailPage',
    components: { ClubDetailPageHeader, ClubDetailPageBody },
};
</script>
