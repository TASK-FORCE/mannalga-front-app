<template>
    <div>
        <UserInterest />
        <GoBackBtnFooter @clickGoBtn="register" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/ui/footer/GoBackBtnFooter.vue';
import UserInterest from '@/components/user/UserInterest.vue';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'RegisterInterestNestedPage',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
        selectedRegions: () => gettersHelper.selectedRegions(),
        selectedInterestSeqs: () => gettersHelper.selectedInterestSeqs(),
    },
    created() {
        if (_.isDeepEmpty(this.kakaoProfile)) {
            this.$router.push(PATH.REGISTER.PROFILE);
            return;
        }

        if (_.isEmpty(this.selectedRegions)) {
            this.$router.push(PATH.REGISTER.REGION);
        }
    },
    methods: {
        register() {
            const registerInfo = {
                profile: this.kakaoProfile,
                selectedRegions: this.selectedRegions,
                selectedInterestSeqs: this.selectedInterestSeqs,
            };

            actionsHelper.postRegister(registerInfo)
                .then(() => this.$router.push(PATH.APP_MAIN)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_REGISTER)))
                .catch(() => this.$router.push(PATH.REGISTER.PROFILE)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SERVER_INSTABILITY)));
        },
    },
};
</script>

<style scoped>

</style>
