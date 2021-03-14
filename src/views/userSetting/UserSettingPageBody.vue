<template>
    <div>
        <UserSettingProfile :userProfile="userProfile" />
        <MiddleDivider :height="5" />
        <div class="mt-7">
            <SettingBar
                :title="themeSettingTitle"
                :icon="themeSettingIcon"
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

<script>
import UserSettingProfile from '@/views/userSetting/components/UserSettingProfile.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import MiddleDivider from '@/components/MiddleDivider.vue';
import SettingBar from '@/components/SettingBar.vue';

export default {
    name: 'UserSettingPageBody',
    components: { SettingBar, MiddleDivider, UserSettingProfile },
    computed: {
        userProfile: () => gettersHelper.userProfile(),
        isDarkTheme: () => gettersHelper.isDarkTheme(),
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
            mutationsHelper.removeAppToken();
            this.$router.push(PATH.LOGIN);
        },
        changeTheme() {
            mutationsHelper.changeTheme();
        },
    },
};
</script>

<style scoped>

</style>
