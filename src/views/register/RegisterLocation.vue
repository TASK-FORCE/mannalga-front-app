<template>
    <div>
        <UserLocation />
        <GoBackBtnFooter @clickGoBtn="clickGoBtn" />
    </div>
</template>

<script>
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { mapGetters, mapMutations } from 'vuex';
import UserLocation from '@/components/UserLocation.vue';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import _ from '@/utils/lodashWrapper.js';
import { MESSAGE } from '@/utils/constant/message.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { PROFILE, SELECTED_LOCATION_SEQS, USER } from '@/store/type/user_type.js';
import { REGISTER } from '@/router/route_path_type.js';

export default {
    name: 'RegisterLocation',
    components: { UserLocation, GoBackBtnFooter },
    data() {
        return {
            selectedTemplateIds: [],
            test: false,
        };
    },
    computed: {
        ...mapGetters(USER, [PROFILE, SELECTED_LOCATION_SEQS]),
    },
    created() {
        if (_.isEmpty(this.profile)) {
            this.$router.push(REGISTER.PROFILE_PATH);
        }
    },
    methods: {
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        clickGoBtn() {
            if (_.isNotEmpty(this[SELECTED_LOCATION_SEQS])) {
                this.$router.push(REGISTER.INTEREST_PATH);
                return;
            }
            this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SELECT_LOCATION_REQUIRE));
        },
    },
};
</script>

<style scoped>

</style>
