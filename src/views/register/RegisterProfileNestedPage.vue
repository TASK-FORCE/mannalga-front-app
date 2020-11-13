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
import GoBackBtnFooter from '@/components/footer/GoBackBtnFooter.vue';
import { getValidationFailText, ruleValidationSuccess } from '@/utils/common/validationUtils.js';
import { RULES } from '@/utils/common/constant/constant.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { PATH } from '@/router/route_path_type.js';

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
                this.$router.push(PATH.REGISTER.REGION);
                return;
            }
            mutationsHelper.openSnackBar(getValidationFailText(name, RULES.PROFILE_NAME));
        },
    },
};

</script>

<style scoped>
</style>
