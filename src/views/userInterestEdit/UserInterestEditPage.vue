<template>
  <div v-show="!$store.state.ui.loading">
    <InterestSelect
      title="관심사 설정"
      :backCallback="back"
      :submitCallback="submit"
      :selectedInterestsCallback="selectedInterestsCallback"
    >
      <template #header-title>
        관심있는 분야를 선택해주세요.
      </template>
      <template #header-description>
        최대 5개까지 선택 가능합니다.
      </template>
    </InterestSelect>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PATH } from '@/router/route_path_type.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import InterestSelect from '@/components/interest/InterestSelect.vue';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { UserActionTypes } from '@/store/type/actionTypes';
import { Interest } from '@/interfaces/common';

export default Vue.extend({
  name: 'UserInterestEditPage',
  components: { InterestSelect },
  data() {
    return {
      btnLoading: false,
    };
  },
  methods: {
    submit(selectedInterests: Interest[]) {
      return this.$store.dispatch(UserActionTypes.REQUEST_CHANGE_USER_INTERESTS, selectedInterests)
        .then(() => {
          this.$store.dispatch(UserActionTypes.REQUEST_USER_PROFILE);
          this.$router.push(PATH.USER.SETTINGS);
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CHANGE_INTERESTS);
        });
    },
    back() {
      this.$router.push(PATH.USER.SETTINGS);
    },
    selectedInterestsCallback() {
      return this.$store.dispatch(UserActionTypes.REQUEST_USER_INTERESTS)
        .then(() => [...this.$store.state.user.selectedInterests]);
    },
  },
});
</script>
