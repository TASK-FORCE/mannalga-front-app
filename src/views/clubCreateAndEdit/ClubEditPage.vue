<template>
  <div>
    <CommonHeader
      title="모임 수정"
      @back="back"
    />
    <ClubCreateAndEditBody
      btnText="모임 수정"
      :submitClickCallback="editClub"
      :context="editContext"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CommonHeader from '@/components/header/CommonHeader.vue';
import ClubCreateAndEditBody from '@/views/clubCreateAndEdit/ClubCreateAndEditBody.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import { ClubInfo, ClubWriteContext, ClubWriteRequest, ClubWriteRequestWithSeq } from '@/interfaces/club.ts';
import { ClubActionTypes } from '@/store/type/actionTypes';
import { InterestWithPriority, RegionWithPriority } from '@/interfaces/common';

export default Vue.extend({
  name: 'ClubEditPage',
  components: { CommonHeader, ClubCreateAndEditBody },
  computed: {
    clubInfo(): ClubInfo {
      return this.$store.state.club.clubInfo;
    },
    editContext(): ClubWriteContext {
      if (this.clubInfo.seq === 0) {
        this.$router.back();
      }
      return {
        name: this.clubInfo.name,
        description: this.clubInfo.description,
        maximumNumber: this.clubInfo.maximumNumber,
        imageUrl: this.clubInfo.mainImageUrl,
        interestList: this.clubInfo.clubInterest.map(({ interest }: InterestWithPriority) => interest),
        regionList: this.clubInfo.clubRegion.map(({ region }: RegionWithPriority) => region),
      };
    },
  },
  methods: {
    back() {
      this.$router.push(PATH.CLUB_LIST);
    },
    editClub(clubWriteRequest: ClubWriteRequest) {
      const clubWriteRequestWithSeq: ClubWriteRequestWithSeq = {
        clubSeq: this.clubInfo.seq,
        clubWriteRequest
      }
      return this.$store.dispatch(ClubActionTypes.REQUEST_CLUB_CHANGE, clubWriteRequestWithSeq)
        .then(() => (this.$router.push(generateParamPath(PATH.CLUB.MAIN, [this.clubInfo.seq]))));
    },
  },
});
</script>

<style scoped>
</style>
