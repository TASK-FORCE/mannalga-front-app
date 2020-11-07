<template>
    <div>
        <ClubMainHeader />
        <ClubMainTab />
    </div>
</template>

<script>
import ClubMainHeader from '@/components/club/main/ClubMainHeader.vue';
import ClubMainTab from '@/components/club/main/ClubMainTab.vue';

export default {
    name: 'ClubMainPage',
    components: { ClubMainHeader, ClubMainTab },
};
</script>
