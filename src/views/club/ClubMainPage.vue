<template>
  <div>
      <!-- <div>값 확인용 : 프롭스 - {{ seq }} / 라우터 - {{ $route.params.seq }}</div> -->
      <ClubHeader :clubName="clubData.clubInfo.clubName"/>
      <ClubTab :clubData="clubData"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClubHeader from '@/components/club/ClubHeader.vue';
import ClubTab from '@/components/club/ClubTab.vue';
import { CLUB, CLUB_DATA, REQUEST_CLUB_DATA } from '@/store/type/club_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'ClubMainPage',
    components: { ClubHeader, ClubTab },
    props: ['seq'],
    data() {
        return {
            // ...
        };
    },
    computed: {
        clubData: () => gettersHelper.clubData(),
    },
    // mounted() {
    //     this.getClubData(this.club_seq);
    // },
    methods: {
        // ...mapActions({
        //     getClubData: "club/getClubData"
        // }),
        getClubData() {
            actionsHelper.requestClubData();
        },
    },
};
</script>
