<template>
    <div>
        <div v-if="imageUrl"
             class="select-image-wrapper"
             @click="openDialog = true"
        >
            <v-img :src="imageUrl"
                   :style="resolveImageStyle"
                   max-height="600"
            />
        </div>
        <div v-else
             class="image-selector-container"
             :style="resolveSelectorStyle"
             @click="clickSelectBox"
        >
            <div
                class="image-selector"
            >
                <v-icon v-text="'$cameraOut'" />
                <div v-if="text"
                     class="font-weight-medium mt-2"
                >
                    {{ text }}
                </div>
            </div>
        </div>
        <!--  @handleUploadedImgDto 이벤트에서 파라미터로 저장된 이미지의 URL를 넘겨준다   -->
        <ImageCropper ref="cropper"
                      :aspectRatio="cropFreeSize ? NaN : undefined"
                      @handleUploadedImgDto="handleUploadedImgDto"
        />
        <ImageCarouselDialog v-model="openDialog"
                             :imgUrls="[imageUrl]"
        >
            <template v-slot:footer>
                <div class="pa-2 text-center w-100">
                    <v-btn class="white--text"
                           outlined
                           @click="triggerCropper"
                    >
                        사진 변경
                    </v-btn>
                </div>
            </template>
        </ImageCarouselDialog>
    </div>
</template>

<script>
import ImageCropper from '@/components/image/ImageCropper.vue';
import ImageCarouselDialog from '@/components/image/ImageCarouselDialog.vue';

export default {
    name: 'ImageSelectBox',
    components: { ImageCarouselDialog, ImageCropper },
    props: {
        text: {
            type: String,
            default: null,
        },
        width: {
            type: String,
        },
        height: {
            type: String,
            default: '50',
        },
        cropFreeSize: {
            type: Boolean,
            default: false,
        },
        fixImage: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            imageUrl: '',
            openDialog: false,
        };
    },
    computed: {
        resolveSelectorStyle() {
            const style = {};
            style.height = `${this.height}px`;
            if (this.width) {
                style.width = `${this.width}px`;
            }
            return style;
        },
        resolveImageStyle() {
            return this.fixImage ? this.resolveSelectorStyle : {};
        },
    },
    methods: {
        clickSelectBox() {
            this.triggerCropper();
        },
        handleUploadedImgDto(imageDto) {
            this.openDialog = false;
            const imageUrl = imageDto.absolutePath;
            this.imageUrl = imageUrl;
            this.$emit('handleImageUrl', imageUrl);
            this.$emit('handleImageDto', imageDto);
        },
        triggerCropper() {
            this.$refs.cropper.trigger();
        },
        clear() {
            this.imageUrl = '';
            this.openDialog = false;
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.image-selector-container {
    position: relative;
    border: thin solid #9e9e9e;
    border-radius: 4px;
    text-align: center;
    padding: 1px;

    .image-selector {
        position: absolute;
        color: #757575;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

</style>
