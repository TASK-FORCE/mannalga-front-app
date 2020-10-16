<template>
    <div>
        <UserInterest />
        <GoBackBtnFooter @clickGoBtn="register" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/user/UserInterest.vue';
import { MESSAGE } from '@/utils/constant/constant.js';
import _ from '@/utils/lodashWrapper.js';
import { MAIN_PATH, REGISTER_PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        profile: () => gettersHelper.profile(),
        selectedRegions: () => gettersHelper.selectedRegions(),
        selectedInterestSeqs: () => gettersHelper.selectedInterestSeqs(),
    },
    created() {
        if (_.isDeepEmpty(this.profile)) {
            this.$router.push(REGISTER_PATH.PROFILE_PATH);
            return;
        }

        if (_.isEmpty(this.selectedRegions)) {
            this.$router.push(REGISTER_PATH.REGION_PATH);
        }
    },
    methods: {
        register() {
            const registerInfo = {
                profile: this.profile,
                selectedRegions: this.selectedRegions,
                selectedInterestSeqs: this.selectedInterestSeqs,
            };

            actionsHelper.postRegister(registerInfo)
                .then(() => this.$router.push(MAIN_PATH)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_REGISTER)))
                .catch(() => this.$router.push(REGISTER_PATH.PROFILE_PATH)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY)));
        },
    },
};
</script>

<style scoped>

</style>
