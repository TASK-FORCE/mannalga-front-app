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

        <ImageCropper ref="cropper"
                     @handleImageUrl="handleImageUrl"
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
            default: '사진 선택',
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
        handleImageUrl(imgUrl) {
            this.imageUrl = imgUrl;
        },
        triggerCropper() {
            this.$refs.cropper.trigger();
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
