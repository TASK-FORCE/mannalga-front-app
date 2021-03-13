<template>
    <UserProfileAvatar v-if="userProfile.userName"
                       :size="35"
                       :name="userProfile.userName"
                       :appendNumber="userProfile.seq"
                       :imgUrl="userProfile.profileImageLink"
                       @click="moveToUserSettings"
    />
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'UserSettingPageEnterAvatar',
    components: { UserProfileAvatar },
    computed: {
        userProfile: () => gettersHelper.userProfile(),
    },
    created() {
        if (!this.userProfile.userName) {
            actionsHelper.requestUserProfile();
        }
    },
    methods: {
        moveToUserSettings() {
            this.$router.push(PATH.USER.SETTINGS);
        },
    },
};
</script>

<style scoped>

</style>
