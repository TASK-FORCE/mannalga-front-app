<template>
    <div>
        <UserLocationPriority />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import _ from '@/utils/lodashWrapper.js';
import { MESSAGE } from '@/utils/constant/constant.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { PROFILE, SELECTED_LOCATIONS, USER } from '@/store/type/user_type.js';
import { REGISTER } from '@/router/route_path_type.js';
import { REQUEST_STATE_TEMPLATE, ROOT_STATES, TEMPLATE } from '@/store/type/template_type.js';
import UserLocationPriority from '@/components/UserLocationPriority.vue';

export default {
    name: 'RegisterLocation',
    components: { UserLocationPriority, GoBackBtnFooter },
    computed: {
        ...mapGetters(USER, [PROFILE, SELECTED_LOCATIONS]),
        ...mapGetters(TEMPLATE, [ROOT_STATES]),
    },
    created() {
        if (_.isDeepEmpty(this[PROFILE])) {
            this.$router.push(REGISTER.PROFILE_PATH);
        }

        if (_.isEmpty(this.rootStates)) {
            this[REQUEST_STATE_TEMPLATE](true);
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_STATE_TEMPLATE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        clickGoBtn() {
            if (_.isNotEmpty(this[SELECTED_LOCATIONS])) {
                this.$router.push(REGISTER.INTEREST_PATH);
                return;
            }
            const snackBarOption = buildSnackBarOption(MESSAGE.SELECT_LOCATION_REQUIRE);
            this[OPEN_SNACKBAR](snackBarOption);
        },
    },
};
</script>

<style scoped>

</style>
