<template>
    <div>
        <RegionSelect
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

<script lang="ts">
import RegionSelect from '@/components/region/RegionSelect.vue';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import { CommonMutationTypes, UserMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue from 'vue';

export default Vue.extend({
    name: 'RegisterRegionNestedPage',
    components: { RegionSelect },
    created() {
        if (_.isDeepEmpty(this.$store.state.user.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
        }
    },
    methods: {
        goNextStep(selectedRegions) {
            if (_.isEmpty(selectedRegions)) {
                this.$store.commit(CommonMutationTypes.OPEN_SNACK_BAR, MESSAGE.SELECT_REGION_REQUIRE);
            } else {
                this.$store.commit(UserMutationTypes.SET_SELECTED_REGIONS, selectedRegions);
                this.$router.push(PATH.REGISTER.INTEREST);
            }
        },
        clickBack() {
            this.$router.push(PATH.REGISTER.PROFILE);
        },
    },
});
</script>
