<template>
    <div v-if="!isLoading">
        <CommonHeader title="설정"
                      @click="moveToClubListPage"
        />
        <UserSettingPageBody />
        <SimpleBtnFooter text="회원 탈퇴" />
    </div>
</template>

<script>
import CommonHeader from '@/components/header/CommonHeader.vue';
import UserSettingPageBody from '@/views/userSetting/UserSettingPageBody.vue';
import SimpleBtnFooter from '@/components/footer/SimpleBtnFooter.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'UserSettingPage',
    components: { CommonHeader, UserSettingPageBody, SimpleBtnFooter },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        userProfile: () => gettersHelper.userProfile(),
    },
    created() {
        if (!this.userProfile.userName) {
            actionsHelper.requestUserProfile();
        }
    },
    methods: {
        moveToClubListPage() {
            this.$router.push(PATH.CLUB_LIST);
        },
    },
};
</script>

<style scoped>

</style>
