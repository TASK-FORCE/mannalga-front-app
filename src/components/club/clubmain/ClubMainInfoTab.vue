<template>
    <div>
        <ClubMainInfoDetailSection :clubInfo="clubInfo" />
        <ClubMainInfoMeetingSection />
        <ClubMainInfoMemberSection style="height: 1000px"/>
    </div>
</template>

<script>
import ClubMainInfoDetailSection from '@/components/club/clubmain/ClubMainInfoDetailSection.vue';
import ClubMainInfoMeetingSection from '@/components/club/clubmain/ClubMainInfoMeetingSection.vue';
import ClubMainInfoMemberSection from '@/components/club/clubmain/ClubMainInfoMemberSection.vue';

export default {
    name: 'ClubMainInfoTab',
    components: { ClubMainInfoMemberSection, ClubMainInfoMeetingSection, ClubMainInfoDetailSection },
    props: {
        clubInfo: Object,
    },
};
</script>

<style scoped>
</style>
