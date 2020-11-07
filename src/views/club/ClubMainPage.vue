<template>
    <div>
        <ClubMainHeader />
        <ClubMainTab />
    </div>
</template>

<script>
import ClubMainHeader from '@/components/club/clubmain/ClubMainHeader.vue';
import ClubMainTab from '@/components/club/clubmain/ClubMainTab.vue';

export default {
    name: 'ClubMainPage',
    components: { ClubMainHeader, ClubMainTab },
};
</script>
