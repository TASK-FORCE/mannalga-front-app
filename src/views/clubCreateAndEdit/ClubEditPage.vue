<template>
  <div>
    <ClubCreateAndEdit
      title="모임 수정"
      :submitClickCallback="editClub"
      :context="editContext"
      @back="back"
    />
    <div
      v-if="isMaster"
      class="club-delete-btn"
      @click="deleteDialog = true"
    >
      모임을 삭제하고 싶어요.
    </div>
    <YesOrNoDialog
      v-model="deleteDialog"
      title="모임을 정말 삭제하시겠습니까?"
      submitText="삭제"
      :submitPromiseCallback="deleteClub"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import { ClubInfo, ClubWriteContext, ClubWriteRequest, ClubWriteRequestWithSeq } from '@/interfaces/club.ts';
import { ClubActionTypes } from '@/store/type/actionTypes';
import { InterestWithPriority, RegionWithPriority } from '@/interfaces/common';
import ClubCreateAndEdit from '@/views/clubCreateAndEdit/ClubCreateAndEdit.vue';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { ClubListMutationTypes, UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';
import { mixin } from '@/mixin/mixin';

export default Vue.extend({
  name: 'ClubEditPage',
  components: { YesOrNoDialog, ClubCreateAndEdit },
  mixins: [mixin],
  data() {
    return {
      deleteDialog: false,
    }
  },
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
    isMaster(): boolean {
      return this.$store.state.club.currentUserInfo.isMaster;
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
      return this.$store.dispatch(ClubActionTypes.REQUEST_CLUB_EDIT, clubWriteRequestWithSeq)
        .then(() => (this.$router.push(generateParamPath(PATH.CLUB.MAIN, [this.clubInfo.seq]))));
    },
    deleteClub() {
      return this.$store.dispatch(ClubActionTypes.REQUEST_CLUB_DELETE, this.clubInfo.seq)
        .then(() => {
          this.$store.commit(ClubListMutationTypes.INIT_CLUB_LIST_AND_PAGE)
          this.$store.commit(ClubListMutationTypes.INIT_MY_CLUB_LIST_AND_PAGE)
          this.$router.push(PATH.CLUB_LIST);
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_DELETE_CLUB)
        });
    },
  },
});
</script>

<style scoped>
.club-delete-btn {
  color: #666666;
  text-decoration-line: underline;
  font-weight: 500;
  margin-top: 15px;
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
