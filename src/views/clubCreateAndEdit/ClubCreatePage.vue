<template>
  <div>
    <ClubCreateAndEdit
      title="모임 만들기"
      :submitClickCallback="createClub"
      @back="back"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PATH } from '@/router/route_path_type.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { ClubWriteRequest } from '@/interfaces/club';
import { ClubActionTypes } from '@/store/type/actionTypes';
import ClubCreateAndEdit from '@/views/clubCreateAndEdit/ClubCreateAndEdit.vue';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubCreatePage',
  components: { ClubCreateAndEdit },
  mixins: [mixin],
  methods: {
    back() {
      this.$router.push(PATH.CLUB_LIST);
    },
    createClub(clubWriteRequest: ClubWriteRequest) {
      return this.$store.dispatch(ClubActionTypes.REQUEST_CLUB_CREATE, clubWriteRequest)
        .then(() => {
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CLUB_CREATE);
          this.$router.push(PATH.CLUB_LIST);
        });
    },
  },
});
</script>

<style scoped>
</style>
