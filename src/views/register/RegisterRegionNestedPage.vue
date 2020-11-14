<template>
    <div>
        <UserRegionSelectList />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import UserRegionSelectList from '@/components/user/UserRegionSelectList.vue';
import GoBackBtnFooter from '@/components/footer/GoBackBtnFooter.vue';
import _ from '@/utils/common/lodashWrapper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import regionAndInterestDispatcher from '@/store/service/RegionAndInterestDispatcher.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'RegisterRegionNestedPage',
    components: { UserRegionSelectList, GoBackBtnFooter },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
        }

        regionAndInterestDispatcher.dispatch(false);
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
