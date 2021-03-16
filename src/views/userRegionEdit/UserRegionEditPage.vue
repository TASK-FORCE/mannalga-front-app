<template>
    <div v-show="!$store.state.common.loading">
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

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import RegionSelect from '@/components/region/RegionSelect.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import { MutationTypes } from '@/store/type/methodTypes.ts';

export default {
    name: 'UserRegionEditPage',
    components: { RegionSelect },
    methods: {
        changeRequest(selectedRegions) {
            actionsHelper.requestChangeUserRegions(selectedRegions)
                .then(() => {
                    actionsHelper.requestUserProfile();
                    this.$store.commit(MutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_CHANGE_REGIONS);
                    this.$router.push(PATH.USER.SETTINGS);
                });
        },
        moveToSettingPage() {
            this.$router.push(PATH.USER.SETTINGS);
        },
        getSelectedRegions() {
            return actionsHelper.requestUserRegions()
                .then(() => [...gettersHelper.selectedRegions()]);
        },
    },
};
</script>
