<template>
    <div>
        <div v-if="originalImgUrl">
            <v-row justify="center">
                <v-dialog :value="openModal"
                          persistent
                          max-width="400"
                >
                    <v-card>
                        <div class="image-cropper-container">
                            <img ref="cropImg"
                                 alt="cropImg"
                                 :src="originalImgUrl"
                                 @load.stop="createCropper"
                            >
                        </div>
                        <v-card-actions class="text-center">
                            <v-btn
                                class="flex-grow-1"
                                color="green darken-1"
                                outlined
                                @click="destroy"
                            >
                                취소
                            </v-btn>
                            <v-btn
                                class="flex-grow-1"
                                color="green darken-1"
                                outlined
                                :loading="isLoading"
                                @click="submit"
                            >
                                완료
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </div>

        <!--   기존 이미지 오픈 트리거     -->
        <input ref="originalImg"
               class="d-none"
               :accept="mimes"
               type="file"
               @change="changeOriginalImage"
        />
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/constant.js';

export default {
    name: 'ImageCropper',
    props: {
        // https://github.com/fengyuanchen/cropperjs#options 참고
        aspectRatio: {
            type: Number,
            default: 16 / 9,
        },
        autoCropArea: {
            type: Number,
            default: 1,
        },
        viewMode: {
            type: Number,
            default: 3,
        },
        movable: {
            type: Boolean,
            default: false,
        },
        zoomable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            originalImgUrl: null,
            cropper: null,
            mimes: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
            isLoading: false,
        };
    },
    computed: {
        openModal() {
            return !!this.originalImgUrl;
        },
        cropperOptions() {
            return {
                aspectRatio: this.aspectRatio,
                autoCropArea: this.autoCropArea,
                viewMode: this.viewMode,
                movable: this.movable,
                zoomable: this.zoomable,
            };
        },
    },
    methods: {
        destroy() {
            this.originalImgUrl = null;
            this.cropper = null;
            this.$refs.originalImg.value = '';
            this.isLoading = false;
        },
        trigger() {
            this.$refs.originalImg.click();
        },
        createCropper() {
            this.cropper = new Cropper(this.$refs.cropImg, this.cropperOptions);
        },
        changeOriginalImage(e) {
            const originalImgInput = e.target;
            if (originalImgInput.files != null && originalImgInput.files[0] != null) {
                const correctType = this.mimes.split(', ').find(m => m === originalImgInput.files[0].type);
                if (!correctType) {
                    this.$emit('error', 'File type not correct.', 'user');
                    return;
                }
                this.loadingOriginalImg(originalImgInput.files[0]);
                this.filename = originalImgInput.files[0].name || 'unknown';
            }
        },
        loadingOriginalImg(file) {
            const reader = new FileReader();
            reader.onload = e => (this.originalImgUrl = e.target.result);
            reader.readAsDataURL(file);
        },
        submit() {
            const croppedCanvas = this.cropper.getCroppedCanvas();
            this.isLoading = true;
            croppedCanvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'test.png');
                actionsHelper.uploadTempImage(formData)
                    .then(tempImageDto => {
                        this.$emit('handleUploadedImgDto', tempImageDto);
                        this.destroy();
                    })
                    .finally(() => (this.isLoading = false));
            });
        },
    },
};
</script>

<style scoped>
.image-cropper-container {
    position: relative;
    max-width: 800px;
}

img {
    width: 100%;
    height: 100%;
}
</style>
