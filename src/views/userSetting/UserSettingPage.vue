<template>
    <div v-show="!$store.state.common.loading">
        <CommonHeader
            title="설정"
            @back="moveToClubListPage"
        />
        <UserSettingPageBody />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CommonHeader from '@/components/header/CommonHeader.vue';
import UserSettingPageBody from '@/views/userSetting/UserSettingPageBody.vue';
import { PATH } from '@/router/route_path_type.js';
import { UserActionTypes } from '@/store/type/actionTypes';

export default Vue.extend({
    name: 'UserSettingPage',
    components: { CommonHeader, UserSettingPageBody },
    created() {
        if (!this.$store.state.user.userProfile.userName) {
            this.$store.dispatch(UserActionTypes.REQUEST_USER_PROFILE);
        }
    },
    methods: {
        moveToClubListPage() {
            this.$router.push(PATH.CLUB_LIST);
        },
    },
});
</script>
<style scoped>

</style>
