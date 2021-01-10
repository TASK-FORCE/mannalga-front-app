<template>
    <div>
        <div v-if="imageUrl"
             class="select-image-wrapper"
             @click="openDialog = true"
        >
            <v-img :src="imageUrl"
                   class="select-image"
                   max-height="600"
            />
        </div>
        <div v-else
             class="image-selector-container"
             :style="setHeight"
             @click="clickSelectBox"
        >
            <div
                class="image-selector"
            >
                <v-icon v-text="'$cameraOut'" />
                <div class="font-weight-medium mt-2">
                    {{ text }}
                </div>
            </div>
        </div>
        <!--  @handleUploadedImg 이벤트에서 파라미터로 저장된 이미지의 URL를 넘겨준다   -->
        <ImageCropper ref="cropper"
                      :aspectRatio="freeSize ? NaN : undefined"
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
            default: '',
        },
        height: {
            type: String,
            default: '50',
        },
        freeSize: {
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
        setHeight() {
            return {
                height: `${this.height}px`,
            };
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
