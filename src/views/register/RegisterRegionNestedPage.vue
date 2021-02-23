<template>
    <div>
        <RegionSelect :selectedRegionsCallback="selectedRegionsCallback"
                      :backCallback="clickBack"
                      :submitCallback="goNextStep"
                      title="회원 가입"
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
import RegionSelect from '@/components/region/RegionSelect.vue';
import _ from '@/utils/common/lodashWrapper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

export default {
    name: 'RegisterRegionNestedPage',
    components: { RegionSelect },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
        }
    },
    methods: {
        goNextStep(selectedRegions) {
            if (_.isEmpty(selectedRegions)) {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_REGION_REQUIRE);
            } else {
                mutationsHelper.setSelectedRegions(selectedRegions);
                this.$router.push(PATH.REGISTER.INTEREST);
            }
        },
        clickBack() {
            this.$router.push(PATH.REGISTER.PROFILE);
        },
        selectedRegionsCallback() {
            return new Promise(resolve => resolve([]));
        },
    },
};
</script>
