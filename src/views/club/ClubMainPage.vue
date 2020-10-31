<template>
  <div>
      <ClubMainHeader :clubName="clubData.clubInfo.name"/>
      <ClubMainTab :clubData="clubData"/>
  </div>
</template>

<script>
import ClubMainHeader from '@/components/club/clubmain/ClubMainHeader.vue';
import ClubMainTab from '@/components/club/clubmain/ClubMainTab.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'ClubMainPage',
    components: { ClubMainHeader, ClubMainTab },
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
