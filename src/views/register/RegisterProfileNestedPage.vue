<template>
  <div>
    <SubmitHeader
      title="회원가입"
      :submitCallback="submit"
      :submitText="'다음'"
      @back="clickBack"
    />
    <UserProfile />
  </div>
</template>

<script lang="ts">
import UserProfile from '@/components/user/UserProfile.vue';
import { validateWithRules } from '@/utils/common/validationUtils.ts';
import { PATH } from '@/router/route_path_type.ts';
import { RULES } from '@/utils/common/constant/rules.ts';
import Vue from 'vue';
import SubmitHeader from '@/components/header/SubmitHeader.vue';

export default Vue.extend({
  name: 'RegisterProfileNestedPage',
  components: { SubmitHeader, UserProfile },
  methods: {
    submit() {
      const { name } = this.$store.state.user.kakaoProfile;
      if (validateWithRules(name, RULES.PROFILE_NAME)) {
        this.$router.push(PATH.REGISTER.REGION);
      }
    },
    clickBack() {
      this.$router.push(PATH.LOGIN);
    },
  },
});

</script>

<style scoped>
</style>
