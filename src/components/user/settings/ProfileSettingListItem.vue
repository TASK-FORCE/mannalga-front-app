<template>
    <div>
        <v-list-item class="my-2">
            <UserProfileAvatar :imgUrl="userSettings.profileImageLink"
                               :size="60"
            />
            <div class="text-center ml-5">
                {{ userSettings.userName }}
                <VerticalBarDivider />
                {{ userSettings.birthday }}
            </div>
            <v-spacer />
            <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import VerticalBarDivider from '@/components/ui/VerticalBarDivider.vue';

export default {
    name: 'ProfileSettingListItem',
    components: { VerticalBarDivider, UserProfileAvatar },
    props: {
        userSettings: Object,
    },
};
</script>

<style scoped>

</style>
