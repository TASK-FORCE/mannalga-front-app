<template>
    <div>
        <UserRegionPriority />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/ui/footer/GoBackBtnFooter.vue';
import _ from '@/utils/common/lodashWrapper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import UserRegionPriority from '@/components/user/UserRegionPriority.vue';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'RegisterRegionNestedPage',
    components: { UserRegionPriority, GoBackBtnFooter },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
        }

        actionsFetcherService.fetchInterestAndRegionTemplate(false);
    },
    methods: {
        clickGoBtn() {
            if (_.isNotEmpty(this.selectedRegions)) {
                this.$router.push(PATH.REGISTER.INTEREST);
                return;
            }
            mutationsHelper.openSnackBar(MESSAGE.SELECT_REGION_REQUIRE);
        },
    },
};
</script>

<style scoped>

</style>
