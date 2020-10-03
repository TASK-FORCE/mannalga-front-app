<template>
    <div>
        <UserLocationPriority />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import _ from '@/utils/lodashWrapper.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import UserLocationPriority from '@/components/UserLocationPriority.vue';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'RegisterLocation',
    components: { UserLocationPriority, GoBackBtnFooter },
    computed: {
        profile: () => gettersHelper.profile(),
        selectedLocations: () => gettersHelper.selectedLocations(),
    },
    created() {
        if (_.isDeepEmpty(this.profile)) {
            this.$router.push(REGISTER_PATH.PROFILE_PATH);
        }

        actionsFetcherService.fetchInterestAndLocationTemplate(false);
    },
    methods: {
        clickGoBtn() {
            if (_.isNotEmpty(this.selectedLocations)) {
                this.$router.push(REGISTER_PATH.INTEREST_PATH);
                return;
            }
            mutationsHelper.openSnackBar(MESSAGE.SELECT_LOCATION_REQUIRE);
        },
    },
};
</script>

<style scoped>

</style>
