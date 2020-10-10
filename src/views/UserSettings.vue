<template>
    <div v-if="!isLoading">
        <CommonHeader title="설정" />
        <UserSettingsList />
        <CommonCenterBtn text="회원 탈퇴"
                         :outlined="true"
                         class="mt-5"
        />
    </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import CommonCenterBtn from '@/components/common/CommonCenterBtn.vue';
import UserSettingsList from '@/components/settings/UserSettingsList.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'UserSettings',
    components: { UserSettingsList, CommonCenterBtn, CommonHeader },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
    },
    created() {
        actionsHelper.requestUserSettings();
    },
};
</script>

<style scoped>

</style>
