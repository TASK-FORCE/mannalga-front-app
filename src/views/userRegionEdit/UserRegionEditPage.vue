<template>
    <div v-show="!$store.state.ui.loading">
        <RegionSelect
            :selectedRegionsCallback="getSelectedRegions"
            :backCallback="moveToSettingPage"
            :submitCallback="changeRequest"
            title="지역 설정"
        >
            <template #header-title>
                참여할 지역을 설정해주세요.
            </template>
            <template #header-description>
                최대 3개까지 선택 가능합니다.
            </template>
        </RegionSelect>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RegionSelect from '@/components/region/RegionSelect.vue';
import { PATH } from '@/router/route_path_type.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import { UserActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
    name: 'UserRegionEditPage',
    components: { RegionSelect },
    methods: {
        changeRequest(selectedRegions) {
            return this.$store.dispatch(UserActionTypes.REQUEST_CHANGE_USER_REGIONS, selectedRegions)
                .then(() => {
                    this.$store.dispatch(UserActionTypes.REQUEST_USER_PROFILE);
                    this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CHANGE_REGIONS);
                    this.$router.push(PATH.USER.SETTINGS);
                });
        },
        moveToSettingPage() {
            this.$router.push(PATH.USER.SETTINGS);
        },
        getSelectedRegions() {
            return this.$store.dispatch(UserActionTypes.REQUEST_USER_REGIONS)
                .then(() => [...this.$store.state.user.selectedRegions]);
        },
    },
});
</script>
