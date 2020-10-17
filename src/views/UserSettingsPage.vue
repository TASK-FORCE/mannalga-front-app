<template>
    <div v-if="!isLoading">
        <CommonHeader title="설정" />
        <UserSettingsList />
    </div>
</template>

<script>
import CommonHeader from '@/components/ui/header/CommonHeader.vue';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import UserSettingsList from '@/components/user/settings/UserSettingsList.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'UserSettingsPage',
    components: { UserSettingsList, CommonHeader },
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
