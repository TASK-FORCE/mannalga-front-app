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
import { RULES } from '@/utils/constant/constant.js';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { getterHelper } from '@/store/helper/getterHelper.js';

export default {
    name: 'RegistProfile',
    components: { GoBackBtnFooter, UserProfile },
    computed: {
        profile: () => getterHelper.profile(),
    },
    methods: {
        clickGoBtn() {
            const { name } = this.profile;
            if (ruleValidationSuccess(name, RULES.PROFILE_NAME)) {
                this.$router.push(REGISTER_PATH.LOCATION_PATH);
                return;
            }
            mutationsHelper.openSnackBar(getValidationFailText(name, RULES.PROFILE_NAME));
        },
    },
};

</script>

<style scoped>
</style>
