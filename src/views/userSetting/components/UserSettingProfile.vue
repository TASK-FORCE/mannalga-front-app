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
                              @handleUploadedImgDto="handleUploadedImgUrl"
                />
                <v-dialog :value="open"
                          persistent
                >
                    <v-card class="pa-3">
                        <div class="text-center">
                            <div class="pa-2">
                                <UserProfileAvatar :imgUrl="url"
                                                   :size="200"
                                />
                            </div>
                            <div class="mt-2">
                                <v-btn color="green darken-2"
                                       class="font-weight-bold"
                                       @click="open = false"
                                >
                                    취소
                                </v-btn>
                                <v-btn color="green darken-2"
                                       class="font-weight-bold ml-5"
                                >
                                    변경
                                </v-btn>
                            </div>
                        </div>
                    </v-card>
                </v-dialog>
            </div>
            <div class="text-center ml-5">
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
            // url: 'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20210110054440-15b3918a-b7d1-4e29-8bf9-b342049120d6-test.png',
            url: null,
            open: false,
        };
    },
    methods: {
        handleUploadedImgUrl({ absolutePath }) {
            this.url = absolutePath;
            this.open = true;
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
