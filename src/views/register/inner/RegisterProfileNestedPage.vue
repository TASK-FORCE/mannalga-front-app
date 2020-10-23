<template>
    <div>
        <UserProfile />
        <GoBackBtnFooter :hideBackBtn="true"
                         @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script>
import UserProfile from '@/components/user/UserProfile.vue';
import GoBackBtnFooter from '@/components/ui/footer/GoBackBtnFooter.vue';
import { getValidationFailText, ruleValidationSuccess } from '@/utils/validationUtils.js';
import { RULES } from '@/utils/constant/constant.js';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';

export default {
    name: 'RegisterProfileNestedPage',
    components: { GoBackBtnFooter, UserProfile },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
    },
    methods: {
        clickGoBtn() {
            const { name } = this.kakaoProfile;
            if (ruleValidationSuccess(name, RULES.PROFILE_NAME)) {
                this.$router.push(REGISTER_PATH.REGION_PATH);
                return;
            }
            mutationsHelper.openSnackBar(getValidationFailText(name, RULES.PROFILE_NAME));
        },
    },
};

</script>

<style scoped>
</style>
