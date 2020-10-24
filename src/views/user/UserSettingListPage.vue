<template>
    <div v-if="!isLoading">
        <CommonHeader title="설정"
                      @clickBack="moveToClubListPage"
        />
        <UserSettingList />
        <SimpleBtnFooter text="회원 탈퇴" />
    </div>
</template>

<script>
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import UserSettingList from '@/components/user/settings/UserSettingList.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import { MAIN_PATH } from '@/router/route_path_type.js';
import SimpleBtnFooter from '@/components/ui/footer/SimpleBtnFooter.vue';

export default {
    name: 'UserSettingListPage',
    components: { SimpleBtnFooter, UserSettingList, CommonHeader },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        actionsHelper.requestUserProfile();
    },
    methods: {
        moveToClubListPage() {
            this.$router.push(MAIN_PATH);
        },
    },
};
</script>

<style scoped>

</style>
