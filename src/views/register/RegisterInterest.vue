<template>
    <div>
        <UserInterest />
        <GoBackBtnFooter @clickGoBtn="register" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import UserInterest from '@/components/UserInterest.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import _ from '@/utils/lodashWrapper.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import {
    POST_REGISTER,
    PROFILE,
    SELECTED_INTEREST_SEQS,
    SELECTED_LOCATIONS,
    USER,
} from '@/store/type/user_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';
import { userBuilder } from '@/utils/builder/builder.js';

export default {
    name: 'RegisterInterest',
    components: { UserInterest, GoBackBtnFooter },
    computed: {
        ...mapGetters(USER, [PROFILE, SELECTED_LOCATIONS, [SELECTED_INTEREST_SEQS]]),
    },
    created() {
        if (_.isEmpty(this[PROFILE])) {
            this.$router.push(REGISTER.PROFILE_PATH);
            return;
        }

        if (_.isEmpty(this[SELECTED_LOCATIONS])) {
            this.$router.push(REGISTER.LOCATION_PATH);
        }
    },
    methods: {
        ...mapActions(USER, [POST_REGISTER]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        register() {
            const registerRequestDto = userBuilder.buildRegisterRequestDto(this[PROFILE], this[SELECTED_LOCATIONS], this[SELECTED_INTEREST_SEQS]);
            this[POST_REGISTER](registerRequestDto)
                .then(() => this.$router.push(MAIN_PATH)
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SUCCESS_REGISTER))))
                .catch(() => this.$router.push(REGISTER.PROFILE_PATH)
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.constant))));
        },
    },
};
</script>

<style scoped>

</style>
