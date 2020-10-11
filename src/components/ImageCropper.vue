<template>
    <div>
        <div v-if="originalImgUrl">
            <v-row justify="center">
                <v-dialog :value="openModal"
                          persistent
                >
                    <v-card>
                        <div class="avatar-cropper-image-container">
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
import { actionsHelper } from '@/store/helper/actionsHelper.js';

export default {
    name: 'ImageCropper',
    props: {
        // https://github.com/fengyuanchen/cropperjs#options 참고
        cropperOptions: {
            type: Object,
            default() {
                return {
                    aspectRatio: 16 / 9,
                    autoCropArea: 1,
                    viewMode: 3,
                    movable: false,
                    zoomable: false,
                };
            },
        },
    },
    data() {
        return {
            originalImgUrl: null,
            cropper: null,
            mimes: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
        };
    },
    computed: {
        openModal() {
            return !!this.originalImgUrl;
        },
    },
    methods: {
        destroy() {
            this.originalImgUrl = null;
            this.cropper = null;
            this.$refs.originalImg.value = '';
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
            croppedCanvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('file', blob, 'test.png');
                actionsHelper.uploadTempImage(formData).then(imgUrl => {
                    this.$emit('handleUploadedImg', imgUrl);
                    this.destroy();
                });
            });
        },
    },
};
</script>

<style scoped>
.avatar-cropper-image-container {
    position: relative;
    max-width: 800px;
}
img {
    max-width: 100%;
    max-height: 100%;
}
</style>
