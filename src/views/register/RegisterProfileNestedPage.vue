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
import { validateWithRules } from '@/utils/common/validationUtils.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import { PATH } from '@/router/route_path_type.js';
import { RULES } from '@/utils/common/constant/rules.js';

export default {
    name: 'RegisterProfileNestedPage',
    components: { GoBackBtnFooter, UserProfile },
    computed: {
        kakaoProfile: () => gettersHelper.kakaoProfile(),
    },
    methods: {
        clickGoBtn() {
            const { name } = this.kakaoProfile;
            if (validateWithRules(name, RULES.PROFILE_NAME)) {
                this.$router.push(PATH.REGISTER.REGION);
            }
        },
    },
};

</script>

<style scoped>
</style>
