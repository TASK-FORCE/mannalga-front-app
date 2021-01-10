<template>
    <div>
        <v-list-item class="my-2">
            <div class="avatar-wrapper">
                <UserProfileAvatar :imgUrl="userProfile.profileImageLink"
                                   :size="60"
                />
                <v-btn class="avatar-edit-btn"
                       fab
                       @click="$refs.cropper.trigger()"
                >
                    <v-icon size="15"
                            v-text="'$pencil'"
                    />
                </v-btn>
                <ImageCropper ref="cropper"
                              :aspectRatio="1"
                              :width="100"
                              :height="100"
                              @handleUploadedImgDto="handleUploadedImgUrl"
                />
                <v-dialog :value="dialogOpen"
                          persistent
                >
                    <v-card class="pa-3">
                        <div class="text-center">
                            <div class="font-weight-bold title">
                                변경 후 프로필 이미지
                            </div>
                            <div class="pa-2">
                                <UserProfileAvatar :imgUrl="newImageUrl"
                                                   :size="200"
                                />
                            </div>
                            <div class="mt-2">
                                <v-btn color="green darken-2"
                                       class="font-weight-bold"
                                       @click="dialogOpen = false"
                                >
                                    취소
                                </v-btn>
                                <v-btn color="green darken-2"
                                       class="font-weight-bold ml-5"
                                       @click="changeProfileImage"
                                >
                                    변경
                                </v-btn>
                            </div>
                        </div>
                    </v-card>
                </v-dialog>
            </div>
            <div class="text-center w-100"
                 style="font-size: 1.2rem"
            >
                {{ userProfile.userName }}
                <VerticalBarDivider />
                {{ userProfile.birthday }}
            </div>
            <v-spacer />
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';
import ImageCropper from '@/components/image/ImageCropper.vue';

export default {
    name: 'UserSettingProfile',
    components: { ImageCropper, VerticalBarDivider, UserProfileAvatar },
    props: {
        userProfile: Object,
    },
    data() {
        return {
            newImageUrl: null,
            dialogOpen: false,
        };
    },
    methods: {
        handleUploadedImgUrl({ absolutePath }) {
            this.newImageUrl = absolutePath;
            this.dialogOpen = true;
        },
        changeProfileImage() {
            this.userProfile.profileImageLink = this.newImageUrl;
            this.dialogOpen = false;
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
