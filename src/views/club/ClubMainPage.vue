<template>
    <div>
        <ClubMainHeader />
        <ClubMainTabs />
    </div>
</template>

<script>
import ClubMainHeader from '@/components/club/main/ClubMainHeader.vue';
import ClubMainTabs from '@/components/club/main/ClubMainTabs.vue';

export default {
    name: 'ClubMainPage',
    components: { ClubMainTabs, ClubMainHeader },
};
</script>
