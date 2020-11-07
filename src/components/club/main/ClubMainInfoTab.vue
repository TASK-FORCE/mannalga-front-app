<template>
    <div>
        <ClubMainInfoDetailSection :clubInfo="clubInfo" />
        <ClubMainInfoMeetingSection />
        <ClubMainInfoMemberSection style="height: 1000px"/>
    </div>
</template>

<script>
import ClubMainInfoDetailSection from '@/components/club/main/ClubMainInfoDetailSection.vue';
import ClubMainInfoMeetingSection from '@/components/club/main/ClubMainInfoMeetingSection.vue';
import ClubMainInfoMemberSection from '@/components/club/main/ClubMainInfoMemberSection.vue';

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
