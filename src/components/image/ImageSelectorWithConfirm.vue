<template>
  <div>
    <ImageCropper
      ref="cropper"
      :aspectRatio="aspectRatio"
      @handleUploadedImgDto="handleUploadedImgDto"
    />
    <v-dialog
      :value="dialogOpen"
      persistent
    >
      <v-card class="pa-3">
        <div class="text-center">
          <div class="font-weight-bold title">
            {{ title }}
          </div>
          <div class="pa-2">
            <slot
              name="image"
              :imageUrl="uploadedImage.absolutePath"
            />
          </div>
          <div class="mt-2">
            <v-btn
              color="green darken-2"
              class="font-weight-bold"
              @click="dialogOpen = false"
            >
              취소
            </v-btn>
            <v-btn
              color="green darken-2"
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

<script lang="ts">
import Vue, { PropType } from 'vue';
import ImageCropper from '@/components/image/ImageCropper.vue';
import { UploadImageResponse } from '@/interfaces/common';
import { MyVueRefs } from '@/types';

const EMPTY: UploadImageResponse = {
  absolutePath: '',
  filePath: '',
  fileName: '',
};

export default (
  Vue as MyVueRefs<{ cropper: HTMLElement & { trigger: () => void } }>
).extend({
  name: 'ImageSelectorWithConfirm',
  components: { ImageCropper },
  props: {
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
    imageChangeCallback: {
      type: Function as PropType<(image: UploadImageResponse) => Promise<any>>,
      required: true,
    },
    title: {
      type: String,
      default: '변경 후 이미지',
    },
  },
  data() {
    return {
      uploadedImage: EMPTY as UploadImageResponse,
      loading: false,
      dialogOpen: false,
    };
  },
  methods: {
    trigger() {
      const cropper = this.$refs.cropper;
      cropper.trigger();
    },
    handleUploadedImgDto(uploadedImage: UploadImageResponse) {
      this.uploadedImage = uploadedImage;
      this.dialogOpen = true;
    },
    changeImage() {
      this.loading = true;
      this.imageChangeCallback(this.uploadedImage)
        .finally(() => {
          this.loading = false;
          this.dialogOpen = false;
          this.uploadedImage = EMPTY;
        });
    },
  },
});
</script>
<style scoped>
</style>
