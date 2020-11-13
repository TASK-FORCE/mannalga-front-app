<template>
    <div>
        <v-list-item class="my-2">
            <UserProfileAvatar :imgUrl="userProfile.profileImageLink"
                               :size="60"
            />
            <div class="text-center ml-5">
                {{ userProfile.userName }}
                <VerticalBarDivider />
                {{ userProfile.birthday }}
            </div>
            <v-spacer />
            <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';

export default {
    name: 'UserSettingProfile',
    components: { VerticalBarDivider, UserProfileAvatar },
    props: {
        userProfile: Object,
    },
};
</script>

<style scoped>

</style>
