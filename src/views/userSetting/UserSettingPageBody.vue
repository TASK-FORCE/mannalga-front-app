<template>
    <div>
        <UserSettingProfile :userProfile="userProfile" />
        <MiddleDivider :height="5" />
        <div v-for="setting in settings"
             :key="setting.name"
        >
            <UserSettingTemplate :setting="setting" />
        </div>
        <SettingBar
            title="어두운 테마 사용"
            icon="water"
        />
    </div>
</template>

<script>
import UserSettingProfile from '@/views/userSetting/components/UserSettingProfile.vue';
import UserSettingTemplate from '@/views/userSetting/components/UserSettingTemplate.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import _ from '@/utils/common/lodashWrapper.js';
import RenderFunction from '@/utils/common/renderFunction.js';
import InterestIcons from '@/components/interest/InterestIcons.vue';
import { changeThemeAndLoad } from '@/plugins/vuetify.js';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import MiddleDivider from '@/components/MiddleDivider.vue';
import SettingBar from '@/components/SettingBar.vue';

export default {
    name: 'UserSettingPageBody',
    components: { SettingBar, MiddleDivider, UserSettingProfile, UserSettingTemplate },
    computed: {
        userProfile: () => gettersHelper.userProfile(),
        regionsByPriority() {
            return _.sortBy(this.userProfile.userRegions, ({ priority }) => priority)
                .map(({ region }) => region);
        },
        settings() {
            return [
                {
                    name: '테마 변경(클릭)',
                    icon: '$brush',
                    clickCallback: changeThemeAndLoad,
                },
                {
                    name: '로그아웃',
                    icon: '$logout',
                    clickCallback: this.logout,
                },
            ];
        },
    },
    methods: {
        logout() {
            mutationsHelper.removeAppToken();
            this.$router.push(PATH.LOGIN);
        },
    },
};
</script>

<style scoped>

</style>
