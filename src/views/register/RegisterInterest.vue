<template>
    <div>
        <UserInterest />
        <GoBackBtnFooter @clickGoBtn="register" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/UserInterest.vue';
import { MESSAGE } from '@/utils/constant/constant.js';
import _ from '@/utils/lodashWrapper.js';
import { MAIN_PATH, REGISTER_PATH } from '@/router/route_path_type.js';
import { userBuilder } from '@/utils/builder/builder.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { getterHelper } from '@/store/helper/getterHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        profile: () => getterHelper.profile(),
        selectedLocations: () => getterHelper.selectedLocations(),
        selectedInterestSeqs: () => getterHelper.selectedInterestSeqs(),
    },
    created() {
        if (_.isDeepEmpty(this.profile)) {
            this.$router.push(REGISTER_PATH.PROFILE_PATH);
            return;
        }

        if (_.isEmpty(this.selectedLocations)) {
            this.$router.push(REGISTER_PATH.LOCATION_PATH);
        }
    },
    methods: {
        register() {
            const registerRequestDto = userBuilder.buildRegisterRequestDto(this.profile, this.selectedLocations, this.selectedInterestSeqs);
            actionsHelper.postRegister(registerRequestDto)
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
