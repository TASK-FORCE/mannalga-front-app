<template>
    <v-tab-item>
        <ClubMainInfoDetailSection :clubInfo="clubInfo" />
        <ClubMainInfoMeetingSection />
        <ClubMainInfoMemberSection />
    </v-tab-item>
</template>

<script>
import ClubMainInfoDetailSection from '@/components/club/clubmain/ClubMainInfoDetailSection.vue';
import ClubMainInfoMeetingSection from '@/components/club/clubmain/ClubMainInfoMeetingSection.vue';
import ClubMainInfoMemberSection from '@/components/club/clubmain/ClubMainInfoMemberSection.vue';

export default {
    name: 'ClubMainInfoTab',
    components: { ClubMainInfoMemberSection, ClubMainInfoMeetingSection, ClubMainInfoDetailSection },
    props: ['clubInfo'],
};
</script>

<style scoped>
</style>
