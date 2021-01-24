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
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';

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

        regionAndInterestVuexService.dispatch(false);
    },
    methods: {
        clickGoBtn() {
            if (this.validate()) {
                this.$router.push(PATH.REGISTER.INTEREST);
            }
        },
        validate() {
            if (_.isEmpty(this.selectedRegions) || !this.isSelectedRegionByPriority(1)) {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_FIRST_REGION_REQUIRE);
            } else if (!this.isSelectedRegionByPriority(2) && this.isSelectedRegionByPriority(3)) {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_SECOND_REGION_REQUIRE);
            } else {
                return true;
            }
            return false;
        },
        isSelectedRegionByPriority(priority) {
            return !!this.selectedRegions[priority];
        },
    },
};
</script>

<style scoped>

</style>
