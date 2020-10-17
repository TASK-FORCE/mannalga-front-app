<template>
    <v-list class="py-0 px-2">
        <v-list-item-group>
            <v-divider />
            <ProfileSettingListItem :userSettings="userSettings" />
            <OtherSettingsListItems :settings="settings" />
        </v-list-item-group>
    </v-list>
</template>

<script>
import OtherSettingsListItems from '@/components/settings/OtherSettingsListItems.vue';
import ProfileSettingListItem from '@/components/settings/ProfileSettingListItem.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import _ from '@/utils/lodashWrapper.js';
import RenderFunction from '@/utils/renderFunction.js';
import InterestIcons from '@/components/InterestIcons.vue';

export default {
    name: 'UserSettingsList',
    components: { OtherSettingsListItems, ProfileSettingListItem },
    computed: {
        userSettings: () => gettersHelper.userSettings(),
        interestsByPriority() {
            return _.sortBy(this.userSettings.userInterests, ({ priority }) => priority)
                .map(({ interest }) => interest);
        },
        regionsByPriority() {
            return _.sortBy(this.userSettings.userRegions, ({ priority }) => priority)
                .map(({ region }) => region);
        },
        settings() {
            return [
                { name: '지역', icon: 'mdi-map-marker', path: '', text: this.createRegionsNameText() },
                { name: '관심사', icon: 'mdi-account-heart', path: '', component: this.createInterestIconsComponent() },
                { name: '알림설정', icon: 'mdi-bell', path: '' },
                { name: '테마', icon: 'mdi-brush', path: '' },
                { name: '개선사항 요청', icon: 'mdi-message-draw', path: '' },
                { name: '공지사항', icon: 'mdi-bullhorn', path: '' },
                { name: '버전정보', icon: 'mdi-information', path: '' },
            ];
        },
    },
    methods: {
        createInterestIconsComponent() {
            return RenderFunction.createComponent(InterestIcons, { interests: this.interestsByPriority });
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
