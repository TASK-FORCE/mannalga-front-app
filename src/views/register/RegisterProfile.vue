<template>
    <div>
        <UserProfile />
        <GoBackBtnFooter :hideBackBtn="true"
                         @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue';
import GoBackBtnFooter from '@/components/GoBackBtnFooter.vue';
import { getValidationFailText, ruleValidationSuccess } from '@/utils/validationUtils.js';
import { mapGetters, mapMutations } from 'vuex';
import { NAME_RULES } from '@/utils/constant/rules.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { COMMON, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { PROFILE, USER } from '@/store/type/user_type.js';

export default {
    name: 'RegistProfile',
    components: { GoBackBtnFooter, UserProfile },
    computed: {
        ...mapGetters(USER, [PROFILE]),
    },
    methods: {
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        clickGoBtn() {
            const { name } = this[PROFILE];
            if (ruleValidationSuccess(name, NAME_RULES)) {
                this.$router.push('/register/location');
                return;
            }
            this[OPEN_SNACKBAR](buildSnackBarOption(getValidationFailText(name, NAME_RULES)));
        },
    },
};

</script>

<style scoped>
</style>
