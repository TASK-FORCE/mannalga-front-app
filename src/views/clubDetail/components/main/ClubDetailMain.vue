<template>
    <div>
        <ClubDetailMainClubInfo :clubInfo="clubInfo" />
        <ClubDetailMainMeeting />
        <ClubDetailMainMember style="height: 1000px" />
    </div>
</template>

<script>
import ClubDetailMainClubInfo from '@/views/clubDetail/components/main/ClubDetailMainClubInfo.vue';
import ClubDetailMainMeeting from '@/views/clubDetail/components/main/ClubDetailMainMeeting.vue';
import ClubDetailMainMember from '@/views/clubDetail/components/main/ClubDetailMainMember.vue';

export default {
    name: 'ClubDetailMain',
    components: { ClubDetailMainClubInfo, ClubDetailMainMeeting, ClubDetailMainMember },
    props: {
        clubInfo: Object,
    },
};
</script>

<style scoped>
</style>
