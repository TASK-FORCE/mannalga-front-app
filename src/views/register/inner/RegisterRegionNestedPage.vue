<template>
    <div>
        <UserRegionPriority />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/ui/footer/GoBackBtnFooter.vue';
import _ from '@/utils/lodashWrapper.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import UserRegionPriority from '@/components/user/UserRegionPriority.vue';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'RegisterRegionNestedPage',
    components: { UserRegionPriority, GoBackBtnFooter },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(REGISTER_PATH.PROFILE_PATH);
        }

        actionsFetcherService.fetchInterestAndRegionTemplate(false);
    },
    methods: {
        clickGoBtn() {
            if (_.isNotEmpty(this.selectedRegions)) {
                this.$router.push(REGISTER_PATH.INTEREST_PATH);
                return;
            }
            mutationsHelper.openSnackBar(MESSAGE.SELECT_REGION_REQUIRE);
        },
    },
};
</script>

<style scoped>

</style>
