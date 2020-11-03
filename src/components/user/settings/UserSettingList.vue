<template>
    <div>
        <v-list class="py-0 px-2">
            <v-list-item-group>
                <v-divider />
                <ProfileSettingListItem :userProfile="userProfile" />
                <OtherSettingsListItems :settings="settings" />
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import OtherSettingsListItems from '@/components/user/settings/OtherSettingsListItems.vue';
import ProfileSettingListItem from '@/components/user/settings/ProfileSettingListItem.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import _ from '@/utils/lodashWrapper.js';
import RenderFunction from '@/utils/renderFunction.js';
import InterestIcons from '@/components/InterestIcons.vue';
import { USER_INTEREST_EDIT_PATH, USER_REGION_EDIT_PATH } from '@/router/route_path_type.js';
import { changeVuetifyTheme } from '@/plugins/vuetify.js';

export default {
    name: 'UserSettingList',
    components: { OtherSettingsListItems, ProfileSettingListItem },
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
                    icon: 'mdi-map-marker',
                    path: USER_REGION_EDIT_PATH,
                    text: this.createRegionsNameText(),
                },
                {
                    name: '관심사',
                    icon: 'mdi-account-heart',
                    path: USER_INTEREST_EDIT_PATH,
                    component: this.createInterestIconsComponent(),
                },
                { name: '알림설정', icon: 'mdi-bell', path: '' },
                {
                    name: '테마 변경(클릭)',
                    icon: 'mdi-brush',
                    clickCallback: changeVuetifyTheme,
                },
                { name: '개선사항 요청', icon: 'mdi-message-draw', path: '' },
                { name: '공지사항', icon: 'mdi-bullhorn', path: '' },
                { name: '버전정보', icon: 'mdi-information', path: '' },
            ];
        },
    },
    methods: {
        createInterestIconsComponent() {
            return RenderFunction.createComponent(InterestIcons, { interests: this.userProfile.userInterests });
        },
        createRegionsNameText() {
            if (this.regionsByPriority && this.regionsByPriority.length > 0) {
                return this.regionsByPriority.map(({ name }) => name).reduce((prev, cur) => `${prev}, ${cur}`);
            }
            return '';
        },
    },
};
</script>

<style scoped>

</style>
