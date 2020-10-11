<template>
    <div>
        <div class="image-selector-container"
             :style="setHeight"
             @click="triggerCropper"
        >
            <div v-if="imageUrl">
                <v-img :src="imageUrl"
                       :height="height"
                />
            </div>
            <div v-else
                 class="image-selector"
            >
                <v-icon>mdi-camera-plus-outline</v-icon>
                <div class="font-weight-medium mt-2">
                    {{ text }}
                </div>
            </div>
        </div>
        <!--  @handleUploadedImg 이벤트에서 파라미터로 저장된 이미지의 URL를 넘겨준다   -->
        <ImageCropper ref="cropper"
                     @handleUploadedImg="handleUploadedImg"
        />
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import ImageCropper from '@/components/ImageCropper.vue';

export default {
    name: 'CommonImageSelectBox',
    components: { ImageCropper },
    props: {
        text: {
            type: String,
            default: '',
        },
        height: {
            type: String,
            default: '50',
        },
    },
    data() {
        return {
            imageUrl: '',
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
        triggerCropper() {
            this.$refs.cropper.trigger();
        },
        handleUploadedImg(imgUrl) {
            this.imageUrl = imgUrl;
            this.$emit('changeImageUrl', imgUrl);
        },
    },
};
</script>

<style scoped>
.image-selector-container {
    position: relative;
    border: thin solid #9e9e9e;
    border-radius: 4px;
    text-align: center;
}

.image-selector {
    position: absolute;
    color: #757575;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
