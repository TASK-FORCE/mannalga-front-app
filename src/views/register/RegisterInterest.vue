<template>
    <div>
        <UserInterest v-show="!isLoading" />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/UserInterest.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/message.js';
import _ from '@/utils/lodashWrapper.js';
import { COMMON, IS_LOADING, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { POST_REGISTER, PROFILE, SELECTED_INTERESTS, SELECTED_LOCATION_SEQS, USER } from '@/store/type/user_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        ...mapGetters(USER, [PROFILE, SELECTED_LOCATION_SEQS, [SELECTED_INTERESTS]]),
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
    },
    created() {
        if (_.isEmpty(this.profile)) {
            this.$router.push(REGISTER.PROFILE_PATH);
            return;
        }

        if (_.isEmpty(this.selectedLocationSeqs)) {
            this.$router.push(REGISTER.LOCATION_PATH);
        }
    },
    methods: {
        ...mapActions(USER, [POST_REGISTER]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        clickGoBtn() {
            const registerInfo = {
                profile: this.profile,
                selectedLocationSeqs: this[SELECTED_LOCATION_SEQS],
                selectedInterests: this[SELECTED_INTERESTS],
            };
            this[POST_REGISTER](registerInfo)
                .then(() => this.$router.push(MAIN_PATH)
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SUCCESS_REGISTER))))
                .catch(() => this.$router.push(REGISTER.PROFILE_PATH)
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        },
    },
};
</script>

<style scoped>

</style>
