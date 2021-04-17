<template>
  <div>
    <div
      v-if="imageUrl || initImage"
      class="select-image-wrapper"
      role="button"
      @click="openImageDialog = true"
    >
      <v-img
        :src="imageUrl || initImage"
        :style="resolveImageStyle"
        max-width="600"
        height="auto"
      />
    </div>
    <div
      v-else
      class="image-selector-container"
      :style="resolveSelectorStyle"
      role="button"
      @click="clickSelectBox"
    >
      <div
        class="image-selector"
      >
        <v-icon v-text="'$cameraOut'" />
        <div
          v-if="text"
          class="font-weight-medium mt-2"
        >
          {{ text }}
        </div>
      </div>
    </div>
    <!--  @handleUploadedImgDto 이벤트에서 파라미터로 저장된 이미지의 URL를 넘겨준다   -->
    <ImageCropper
      ref="cropper"
      :cropFreeSize="cropFreeSize"
      @handleUploadedImgDto="handleUploadedImgDto"
    />
    <ImageCarouselDialog
      v-model="openImageDialog"
      :imgUrls="[imageUrl || initImage]"
    >
      <template v-slot:footer>
        <div class="pa-2 text-center w-100">
          <v-btn
            class="white--text mr-4"
            outlined
            @click="deleteImageDialog = true"
          >
            사진 삭제
          </v-btn>
          <v-btn
            class="white--text"
            outlined
            @click="triggerCropper"
          >
            사진 변경
          </v-btn>
        </div>
      </template>
    </ImageCarouselDialog>
    <YesOrNoDialog
      v-if="deleteImageDialog"
      v-model="deleteImageDialog"
      title="사진을 정말 삭제하시겠습니까?"
      submitText="삭제"
      :submitPromiseCallback="deleteImage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ImageCropper from '@/components/image/ImageCropper.vue';
import ImageCarouselDialog from '@/components/image/ImageCarouselDialog.vue';
import { UploadImageResponse } from '@/interfaces/common';
import { MyVueRefs } from '@/types';
import YesOrNoDialog from '@/components/YesOrNoDialog.vue';

export default (
  Vue as MyVueRefs<{ cropper: HTMLElement & { trigger: () => void } }>
).extend({
  name: 'ImageSelectBox',
  components: { YesOrNoDialog, ImageCarouselDialog, ImageCropper },
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
    initImage: {
      type: String,
    },
  },
  data() {
    return {
      imageUrl: '',
      openImageDialog: false,
      deleteImageDialog: false,
    };
  },
  computed: {
    resolveSelectorStyle() {
      return {
        height: `${this.height}px`,
        width: this.width ? `${this.width}px` : '',
      };
    },
    resolveImageStyle(): object {
      return this.fixImage ? this.resolveSelectorStyle : {};
    },
  },
  methods: {
    clickSelectBox() {
      this.triggerCropper();
    },
    handleUploadedImgDto(uploadedImage: UploadImageResponse) {
      this.openImageDialog = false;
      this.imageUrl = uploadedImage.absolutePath;
      this.$emit('handleUploadedImage', uploadedImage);
    },
    triggerCropper() {
      const cropper = this.$refs.cropper;
      cropper.trigger();
    },
    deleteImage() {
      this.$emit('deleteImage');
      this.clear();
      return Promise.resolve();
    },
    clear() {
      this.imageUrl = '';
      this.openImageDialog = false;
    },
  },
});
</script>

<style
  scoped
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

.theme--dark {
  .image-selector-container {
    border-color: #666666;
  }
}

</style>
