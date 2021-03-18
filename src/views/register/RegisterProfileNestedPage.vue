<template>
    <div>
        <CommonHeader
            title="회원가입"
            @back="clickBack"
        />
        <UserProfile />
        <GoBackBtnFooter
            :hideBackBtn="true"
            @clickGoBtn="clickGoBtn"
        />
    </div>
</template>

<script lang="ts">
import UserProfile from '@/components/user/UserProfile.vue';
import GoBackBtnFooter from '@/components/footer/GoBackBtnFooter.vue';
import { validateWithRules } from '@/utils/common/validationUtils.js';
import { PATH } from '@/router/route_path_type.js';
import { RULES } from '@/utils/common/constant/rules.js';
import CommonHeader from '@/components/header/CommonHeader.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'RegisterProfileNestedPage',
    components: { CommonHeader, GoBackBtnFooter, UserProfile },
    methods: {
        clickGoBtn() {
            const { name } = this.$store.state.user.kakaoProfile;
            if (validateWithRules(name, RULES.PROFILE_NAME)) {
                this.$router.push(PATH.REGISTER.REGION);
            }
        },
        clickBack() {
            this.$router.push(PATH.LOGIN);
        },
    },
});

</script>

<style scoped>
</style>
