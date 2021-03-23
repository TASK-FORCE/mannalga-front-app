<template>
  <InterestSelect
    title="회원가입"
    :backCallback="back"
    :submitCallback="register"
  >
    <template #header-title>
      관심있는 분야를 선택해주세요.
    </template>
    <template #header-description>
      최대 5개까지 선택 가능합니다.
    </template>
  </InterestSelect>
</template>

<script lang="ts">
import Vue from 'vue';
import { PATH } from '@/router/route_path_type.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import InterestSelect from '@/components/interest/InterestSelect.vue';
import _ from '@/utils/common/lodashWrapper.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { KakaoProfile, UserRegisterContext } from '@/interfaces/user';
import { Interest, Region } from '@/interfaces/common';
import { UserActionTypes } from '@/store/type/actionTypes';


export default Vue.extend({
  name: 'RegisterInterestNestedPage',
  components: { InterestSelect },
  computed: {
    kakaoProfile(): KakaoProfile {
      return this.$store.state.user.kakaoProfile;
    },
    selectedRegions(): Region[] {
      return this.$store.state.user.selectedRegions;
    },
  },
  created() {
    if (_.isDeepEmpty(this.kakaoProfile)) {
      this.$router.push(PATH.REGISTER.PROFILE);
      return;
    }

    if (_.isEmpty(this.selectedRegions)) {
      this.$router.push(PATH.REGISTER.REGION);
    }
  },
  methods: {
    register(selectedInterests: Interest[]) {
      const userRegisterContext: UserRegisterContext = {
        profile: this.kakaoProfile,
        selectedRegions: this.selectedRegions,
        selectedInterests: selectedInterests,
      };

      this.$store.dispatch(UserActionTypes.REQUEST_REGISTER, userRegisterContext)
        .then(() => this.$router.push(PATH.CLUB_LIST)
          .then(() => this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_REGISTER)))
        .catch(() => this.$router.push(PATH.REGISTER.PROFILE));
    },
    back() {
      this.$router.push(PATH.REGISTER.REGION);
    },
  },
});
</script>
