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
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserSettingProfile from '@/views/userSetting/components/UserSettingProfile.vue';
import _ from '@/utils/common/lodashWrapper.ts';
import { PATH } from '@/router/route_path_type.ts';
import MiddleDivider from '@/components/MiddleDivider.vue';
import SettingBar from '@/components/SettingBar.vue';
import { AuthMutationTypes, CommonMutationTypes } from '@/store/type/mutationTypes';
import { UserProfile } from '@/interfaces/user';

export default Vue.extend({
    name: 'UserSettingPageBody',
    components: { SettingBar, MiddleDivider, UserSettingProfile },
    computed: {
        userProfile(): UserProfile {
            return this.$store.state.user.userProfile;
        },
        isDarkTheme(): boolean {
            return this.$store.state.common.isDarkTheme;
        },
        regionsByPriority() {
            return _.sortBy(this.userProfile.userRegions, ({ priority }) => priority)
                .map(({ region }) => region);
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
        logout() {
            this.$store.commit(AuthMutationTypes.REMOVE_APP_TOKEN);
            this.$router.push(PATH.LOGIN);
        },
        changeTheme() {
            this.$store.commit(CommonMutationTypes.CHANGE_THEME);
        },
    },
});
</script>

<style scoped>

</style>
