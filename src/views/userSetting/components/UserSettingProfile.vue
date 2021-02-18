<template>
    <div>
        <v-list-item class="my-2">
            <div class="avatar-wrapper">
                <UserProfileAvatar :size="60"
                                   :name="userProfile.userName"
                                   :appendNumber="userProfile.seq"
                                   :imgUrl="userProfile.profileImageLink"
                />
                <v-btn class="avatar-edit-btn"
                       fab
                       @click="$refs.imageSelector.trigger()"
                >
                    <v-icon size="15"
                            v-text="'$pencil'"
                    />
                </v-btn>
                <ImageSelectorWithConfirm ref="imageSelector"
                                          title="변경 후 프로필 이미지"
                                          :aspectRatio="1"
                                          :imageChangeCallback="changeProfileImage"
                >
                    <template #image="{ imageUrl }">
                        <UserProfileAvatar :imgUrl="imageUrl"
                                           :size="200"
                        />
                    </template>
                </ImageSelectorWithConfirm>
            </div>
            <div class="text-center w-100"
                 style="font-size: 1.2rem"
            >
                {{ userProfile.userName }}
            </div>
            <v-spacer />
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import ImageSelectorWithConfirm from '@/components/image/ImageSelectorWithConfirm.vue';

export default {
    name: 'UserSettingProfile',
    components: { ImageSelectorWithConfirm, UserProfileAvatar },
    props: {
        userProfile: Object,
    },
    data() {
        return {
            dialogOpen: false,
            loading: false,
        };
    },
    methods: {
        changeProfileImage(imageDto) {
            return actionsHelper.requestChangeUserProfile(imageDto);
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.avatar-wrapper {
    position: relative;

    .avatar-edit-btn {
        color: white;
        background-color: #4caf50 !important;
        width: 25px;
        height: 25px;
        position: absolute;
        bottom: 0;
        right: -10px;
    }
}
</style>
