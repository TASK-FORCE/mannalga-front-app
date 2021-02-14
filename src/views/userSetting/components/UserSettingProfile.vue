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
                       @click="$refs.cropper.trigger()"
                >
                    <v-icon size="15"
                            v-text="'$pencil'"
                    />
                </v-btn>
                <ImageCropper ref="cropper"
                              :aspectRatio="1"
                              :width="200"
                              :height="200"
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
                                <UserProfileAvatar :imgUrl="profileImageDto.absolutePath"
                                                   :size="200"
                                />
                            </div>
                            <div class="mt-2">
                                <v-btn color="green darken-2"
                                       class="white--text font-weight-bold"
                                       @click="dialogOpen = false"
                                >
                                    취소
                                </v-btn>
                                <v-btn color="green darken-2"
                                       class="white--text font-weight-bold ml-5"
                                       :loading="loading"
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
            </div>
            <v-spacer />
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import UserProfileAvatar from '@/components/user/UserProfileAvatar.vue';
import ImageCropper from '@/components/image/ImageCropper.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';

const DEFAULT = {
    absolutePath: '',
    filePath: '',
    fileName: '',
};

export default {
    name: 'UserSettingProfile',
    components: { ImageCropper, UserProfileAvatar },
    props: {
        userProfile: Object,
    },
    data() {
        return {
            profileImageDto: DEFAULT,
            dialogOpen: false,
            loading: false,
        };
    },
    methods: {
        handleUploadedImgUrl(profileImageDto) {
            this.profileImageDto = profileImageDto;
            this.dialogOpen = true;
        },
        changeProfileImage() {
            this.loading = true;
            actionsHelper.requestChangeUserProfile(this.profileImageDto)
                .finally(() => {
                    this.profileImageDto = DEFAULT;
                    this.loading = false;
                    this.dialogOpen = false;
                });
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
