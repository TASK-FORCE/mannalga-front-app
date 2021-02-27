<template>
    <div>
        <ClubDetailMainClubInfo :clubInfo="clubInfo"
                                :currentUserInfo="currentUserInfo"
        />
        <MiddleDivider :height="5" />
        <ClubDetailMainMember :clubInfo="clubInfo"
                              :clubUserList="clubUserList"
                              :currentUserInfo="currentUserInfo"
        />
    </div>
</template>

<script>
import ClubDetailMainClubInfo from '@/views/clubDetail/components/main/ClubDetailMainClubInfo.vue';
import ClubDetailMainMember from '@/views/clubDetail/components/main/ClubDetailMainMember.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';

export default {
    name: 'ClubDetailMain',
    components: { MiddleDivider, ClubDetailMainClubInfo, ClubDetailMainMember },
    props: {
        clubInfo: Object,
        currentUserInfo: Object,
        clubUserList: Array,
    },
};
</script>

<style scoped>
</style>
