<template>
    <v-dialog
        :value="value"
        persistent
    >
        <v-card>
            <div class="d-flex pa-3">
                <div
                    class="font-weight-bold ml-2"
                    style="font-size: 1.3rem"
                >
                    사진첩 등록
                </div>
            </div>
            <div class="px-4">
                <v-form ref="form">
                    <v-text-field
                        v-model="title"
                        :rules="RULES.CLUB_ALBUM_TITLE"
                        class="pa-0"
                        label="사진 제목"
                    />
                </v-form>
                <ImageSelectBox
                    ref="imgSelectBox"
                    class="mt-1 mb-3 elevation-2"
                    height="300"
                    cropFreeSize
                    @handleUploadedImage="changeToUploadedImage"
                />
            </div>
            <div class="text-center pa-3">
                <v-btn
                    color="green darken-1"
                    outlined
                    @click="$emit('input', false)"
                >
                    취소
                </v-btn>
                <v-btn
                    class="ml-3"
                    color="green darken-1"
                    outlined
                    @click="requestAlbumCreate"
                >
                    등록
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import routerHelper from '@/router/RouterHelper.ts';
import { RULES } from '@/utils/common/constant/rules.ts';
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { CommonMutationTypes } from '@/store/type/mutationTypes.ts';
import { UploadImageResponse } from '@/interfaces/common.ts';
import { AlbumActionTypes } from '@/store/type/actionTypes';
import { AlbumWriteRequest } from '@/interfaces/album';

export default Vue.extend({
    name: 'AlbumImageCreateDialog',
    components: { ImageSelectBox },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            RULES,
            title: null,
            image: null as UploadImageResponse,
        };
    },
    methods: {
        requestAlbumCreate() {
            if (this.$refs.form.validate()) {
                if (this.image) {
                    const albumWriteRequest: AlbumWriteRequest = {
                        clubSeq: routerHelper.clubSeq(),
                        title: this.title,
                        image: { ...this.image },
                    };
                    this.$store.dispatch(AlbumActionTypes.REQUEST_ALBUM_CREATE, albumWriteRequest)
                        .then(() => {
                            this.$store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST, routerHelper.clubSeq());
                            this.clear();
                            this.$store.commit(CommonMutationTypes.OPEN_SNACK_BAR, MESSAGE.SUCCESS_IMAGE_REGISTER);
                        });
                }
            } else {
                this.$store.commit(CommonMutationTypes.OPEN_SNACK_BAR, MESSAGE.SELECT_IMAGE_REQUIRE);
            }
        },
        changeToUploadedImage(uploadedImage: UploadImageResponse) {
            this.image = uploadedImage;
        },
        clear() {
            this.title = null;
            this.imgUrl = null;
            this.fileName = null;
            this.$emit('input', false);
            this.$refs.imgSelectBox.clear();
            this.$refs.form.resetValidation();
        },
    },
});
</script>

<style scoped>

</style>
