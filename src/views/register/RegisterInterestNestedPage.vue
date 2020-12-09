<template>
    <div>
        <UserInterestSelectList />
        <GoBackBtnFooter @clickGoBtn="register" />
    </div>
</template>

<script>
import UserInterestSelectList from '@/components/user/UserInterestSelectList.vue';
import GoBackBtnFooter from '@/components/footer/GoBackBtnFooter.vue';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import _ from '@/utils/common/lodashWrapper.js';
import { PATH } from '@/router/route_path_type.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';

export default {
    name: 'RegisterInterestNestedPage',
    components: { UserInterestSelectList, GoBackBtnFooter },
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
                .then(() => this.$router.push(PATH.CLUB_LIST)
                    .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_REGISTER)))
                .catch(() => this.$router.push(PATH.REGISTER.PROFILE));
        },
    },
};
</script>

<style scoped>

</style>
