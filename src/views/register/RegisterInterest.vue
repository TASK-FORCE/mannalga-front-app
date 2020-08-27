<template>
    <div>
        <UserInterest v-show="!isLoading" />
        <GoBackBtnFooter @clickGoBtn="register" />
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
import { POST_REGISTER, PROFILE, SELECTED_INTEREST_SEQS, SELECTED_LOCATION_SEQS, USER } from '@/store/type/user_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';
import { userBuilder } from '@/utils/builder/builder.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        ...mapGetters(USER, [PROFILE, SELECTED_LOCATION_SEQS, [SELECTED_INTEREST_SEQS]]),
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
    },
    created() {
        if (_.isEmpty(this[PROFILE])) {
            this.$router.push(REGISTER.PROFILE_PATH);
            return;
        }

        if (_.isEmpty(this[SELECTED_LOCATION_SEQS])) {
            this.$router.push(REGISTER.LOCATION_PATH);
        }
    },
    methods: {
        ...mapActions(USER, [POST_REGISTER]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        register() {
            const registerRequestDto = userBuilder.buildRegisterRequestDto(this[PROFILE], this[SELECTED_LOCATION_SEQS], this[SELECTED_INTEREST_SEQS]);
            this[POST_REGISTER](registerRequestDto)
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
