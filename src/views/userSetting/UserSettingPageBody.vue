<template>
  <div>
    <UserSettingProfile :userProfile="userProfile" />
    <MiddleDivider :height="5" />
    <div class="mt-7">
      <SettingBar
        :title="themeSettingTitle"
        :icon="themeSettingIcon"
        :switchValue="isDarkTheme"
        switchBtn
        @click="changeTheme"
      />
      <SettingBar
        title="로그아웃"
        icon="logout"
        @click="logout"
      />
      <SettingBar
        title="회원 탈퇴"
        icon="power"
        @click="withdrawalDialog = true"
      />
    </div>
    <YesOrNoDialog
      v-model="withdrawalDialog"
      title="정말로 탈퇴하시겠습니까?"
      :submitPromiseCallback="withdraw"
    >
      <template #description>
        <div class="ml-2">
          확인 시 즉시 탈퇴됩니다.
        </div>
      </template>
    </YesOrNoDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserSettingProfile from '@/views/userSetting/components/UserSettingProfile.vue';
import _ from '@/utils/common/lodashWrapper.ts';
import { PATH } from '@/router/route_path_type.ts';
import MiddleDivider from '@/components/MiddleDivider.vue';
import SettingBar from '@/components/SettingBar.vue';
import { AuthMutationTypes, UIMutationTypes } from '@/store/type/mutationTypes';
import { UserProfile } from '@/interfaces/user';
import { Region, RegionWithPriority } from '@/interfaces/common';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';
import { UserActionTypes } from '@/store/type/actionTypes';
import { MESSAGE } from '@/utils/common/constant/messages';

export default Vue.extend({
  name: 'UserSettingPageBody',
  components: { YesOrNoDialog, SettingBar, MiddleDivider, UserSettingProfile },
  data() {
    return {
      withdrawalDialog: false,
    }
  },
  computed: {
    userProfile(): UserProfile {
      return this.$store.state.user.userProfile;
    },
    isDarkTheme(): boolean {
      return this.$store.state.ui.isDarkTheme;
    },
    regionsByPriority(): Region[] {
      return _.sortBy(this.userProfile.userRegions, ({ priority }: RegionWithPriority) => priority)
        .map(({ region }: RegionWithPriority) => region);
    },
    themeSettingTitle() {
      if (this.isDarkTheme) {
        return '밝은 테마 사용';
      }
      return '어두운 테마 사용';
    },
    themeSettingIcon() {
      if (this.isDarkTheme) {
        return 'waterOut';
      }
      return 'water';
    },
  },
  methods: {
    moveToLoginPage() {
      this.$router.push(PATH.LOGIN);
    },
    logout() {
      this.$store.commit(AuthMutationTypes.REMOVE_APP_TOKEN);
      this.moveToLoginPage();
    },
    changeTheme() {
      this.$store.commit(UIMutationTypes.CHANGE_THEME);
    },
    withdraw() {
      return this.$store.dispatch(UserActionTypes.REQUEST_APP_WITHDRAW)
        .then(() => {
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.WITHDRAW_APP)
          this.$store.commit(AuthMutationTypes.REMOVE_APP_TOKEN);
          this.moveToLoginPage();
        })
    },
  },
});
</script>

<style scoped>

</style>
