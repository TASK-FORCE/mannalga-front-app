<template>
  <UserProfileAvatar
    v-if="userProfile.userName"
    :size="35"
    :name="userProfile.userName"
    :appendNumber="userProfile.seq"
    :imgUrl="userProfile.profileImageLink"
    @click="moveToUserSettings"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import { PATH } from '@/router/route_path_type.ts';
import { UserProfile } from '@/interfaces/user';
import { UserActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
  name: 'UserSettingPageEnterAvatar',
  components: { UserProfileAvatar },
  computed: {
    userProfile(): UserProfile {
      return this.$store.state.user.userProfile;
    },
  },
  created() {
    if (!this.userProfile.userName) {
      this.$store.dispatch(UserActionTypes.REQUEST_USER_PROFILE);
    }
  },
  methods: {
    moveToUserSettings() {
      this.$router.push(PATH.USER.SETTINGS);
    },
  },
});
</script>

<style scoped>

</style>
