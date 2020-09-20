<template>
  <div>
      <!-- <div>값 확인용 : 프롭스 - {{ seq }} / 라우터 - {{ $route.params.seq }}</div> -->
      <ClubHeader :clubName="clubData.clubName"/>
      <ClubTab :clubData="clubData"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ClubHeader from '@/components/club/ClubHeader.vue';
import ClubTab from '@/components/club/ClubTab.vue';
import { CLUB_DATA, REQUEST_CLUB_DATA, CLUB } from '@/store/type/club_type.js';

export default {
    name: 'ClubMain',
    components: { ClubHeader, ClubTab },
    props: ['seq'],
    data() {
        return {
            // ...
        };
    },
    computed: {
        ...mapGetters(CLUB, { clubData: CLUB_DATA }),
    },
    // mounted() {
    //     this.getClubData(this.club_seq);
    // },
    methods: {
        // ...mapActions({
        //     getClubData: "club/getClubData"
        // }),
        ...mapActions(CLUB, [REQUEST_CLUB_DATA]),
    },
};
</script>
