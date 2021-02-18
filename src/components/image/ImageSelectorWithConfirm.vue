<template>
    <div>
        <ImageCropper ref="cropper"
                      :aspectRatio="aspectRatio"
                      @handleUploadedImgDto="handleUploadedImgDto"
        />
        <v-dialog :value="dialogOpen"
                  persistent
        >
            <v-card class="pa-3">
                <div class="text-center">
                    <div class="font-weight-bold title">
                        {{ title }}
                    </div>
                    <div class="pa-2">
                        <slot name="image"
                              :imageUrl="imageDto.absolutePath"
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
                               :loading="loading"
                               @click="changeImage"
                        >
                            변경
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ImageCropper from '@/components/image/ImageCropper.vue';

const DEFAULT = {
    absolutePath: '',
    filePath: '',
    fileName: '',
};

export default {
    name: 'ImageSelectorWithConfirm',
    components: { ImageCropper },
    props: {
        aspectRatio: {
            type: Number,
            default: 16 / 9,
        },
        imageChangeCallback: {
            type: Function, // (dto) => {}: Promise
            required: true,
        },
        title: {
            type: String,
            default: '변경 후 이미지',
        },
    },
    data() {
        return {
            imageDto: DEFAULT,
            loading: false,
            dialogOpen: false,
        };
    },
    methods: {
        trigger() {
            this.$refs.cropper.trigger();
        },
        handleUploadedImgDto(dto) {
            this.imageDto = dto;
            this.dialogOpen = true;
        },
        changeImage() {
            this.loading = true;
            this.imageChangeCallback(this.imageDto)
                .finally(() => {
                    this.loading = false;
                    this.dialogOpen = false;
                    this.imageDto = DEFAULT;
                });
        },
    },
};
</script>

<style scoped>
</style>
