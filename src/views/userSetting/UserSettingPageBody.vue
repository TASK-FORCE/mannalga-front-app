<template>
    <div>
        <v-list class="py-0 px-2">
            <v-divider />
            <UserSettingProfile :userProfile="userProfile" />
            <div v-for="setting in settings"
                 :key="setting.name"
            >
                <UserSettingTemplate :setting="setting" />
            </div>
        </v-list>
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

export default {
    name: 'UserSettingPageBody',
    components: { UserSettingProfile, UserSettingTemplate },
    computed: {
        userProfile: () => gettersHelper.userProfile(),
        regionsByPriority() {
            return _.sortBy(this.userProfile.userRegions, ({ priority }) => priority)
                .map(({ region }) => region);
        },
        settings() {
            return [
                {
                    name: '지역',
                    icon: '$mapMarker',
                    path: PATH.USER.REGION_EDIT,
                    text: this.createRegionsNameText(),
                },
                {
                    name: '관심사',
                    icon: '$accountHeart',
                    path: PATH.USER.INTEREST_EDIT,
                    component: this.createInterestIconsComponent(),
                },
                {
                    name: '알림설정',
                    icon: '$bell',
                    path: '',
                },
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
        createInterestIconsComponent() {
            return RenderFunction.createComponent(InterestIcons, { interestListWithPriority: this.userProfile.userInterests });
        },
        createRegionsNameText() {
            if (this.regionsByPriority && this.regionsByPriority.length > 0) {
                return this.regionsByPriority.map(({ name }) => name).reduce((prev, cur) => `${prev}, ${cur}`);
            }
            return '';
        },
        logout() {
            mutationsHelper.removeAppToken();
            this.$router.push(PATH.LOGIN);
        },
    },
};
</script>

<style scoped>

</style>
