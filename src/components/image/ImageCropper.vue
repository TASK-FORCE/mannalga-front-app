<template>
  <div>
    <div v-if="originalImgUrl">
      <v-dialog
        :value="openModal"
        persistent
        fullscreen
      >
        <div class="h-100 d-flex black-bg">
          <div class="my-auto w-100 text-center">
            <div class="image-cropper-container px-2">
              <img
                ref="cropImg"
                alt="cropImg"
                :src="originalImgUrl"
                :style="resolveImgStyle"
                @load.stop="createCropper"
              >
            </div>
            <v-card-actions class="text-center mt-3">
              <v-btn
                class="flex-grow-1 white--text font-weight-bold"
                color="#2883C6"
                @click="destroy"
              >
                취소
              </v-btn>
              <v-btn
                class="flex-grow-1 white--text font-weight-bold"
                color="#2883C6"
                :loading="isLoading"
                @click="submitCroppedImage"
              >
                완료
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-dialog>
    </div>

    <!--   기존 이미지 오픈 트리거     -->
    <input
      ref="originalImg"
      class="d-none"
      :accept="mimes"
      type="file"
      @change="changeOriginalImage"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { UIActionTypes } from '@/store/type/actionTypes';
import { MyVueRefs } from '@/types';
import ViewMode = Cropper.ViewMode;

const supportImageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/bmp', 'image/x-icon'];
const cropperTargetImageTypes = ['image/png', 'image/jpeg'];

export default (
  Vue as MyVueRefs<{
    originalImg: HTMLInputElement;
    cropImg: HTMLImageElement;
  }>
).extend({
  name: 'ImageCropper',
  props: {
    // https://github.com/fengyuanchen/cropperjs#options 참고
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
    cropFreeSize: {
      type: Boolean,
      default: false,
    },
    autoCropArea: {
      type: Number,
      default: 1,
    },

    viewMode: {
      type: Number as PropType<ViewMode>,
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
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      originalImgUrl: undefined as string | undefined,
      selectedImageFile: undefined as File | undefined,
      cropper: undefined as undefined | Cropper,
      mimes: supportImageTypes.reduce((prev, cur) => `${prev}, ${cur}`),
      isLoading: false as boolean,
    };
  },
  computed: {
    openModal(): boolean {
      return !!this.originalImgUrl;
    },
    cropperOptions(): Cropper.Options<HTMLImageElement> {
      return {
        aspectRatio: this.cropFreeSize ? NaN : this.aspectRatio,
        autoCropArea: this.autoCropArea,
        viewMode: this.viewMode as ViewMode,
        movable: this.movable,
        zoomable: this.zoomable,
        minContainerWidth: window.innerWidth,
      };
    },
    resolveImgStyle() {
      return {
        maxHeight: `${window.innerHeight - 100}px`,
        maxWidth: '600px',
      };
    },
  },
  methods: {
    destroy() {
      this.originalImgUrl = undefined;
      this.cropper = undefined;
      const originalImg = this.$refs.originalImg;
      originalImg.value = '';
      this.isLoading = false;
    },
    trigger() {
      const originalImg = this.$refs.originalImg;
      originalImg.click();
    },
    createCropper() {
      const cropImg = this.$refs.cropImg;
      const cropper = new Cropper(cropImg, this.cropperOptions);
      this.cropper = cropper;
      if (this.width !== 0 && this.height !== 0) {
        const callback = () => {
          if (Object.keys(cropper.getCropBoxData()).length === 4) {
            cropper.setCropBoxData({
              width: this.width,
              height: this.height,
            });
          } else {
            setTimeout(callback, 50);
          }
        };
        setTimeout(callback, 50);
      }
    },
    loadingOriginalImg(file: File) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => (this.originalImgUrl = (e.target?.result as string));
      reader.readAsDataURL(file);
      this.selectedImageFile = file;
    },
    changeOriginalImage(e: InputEvent) {
      if (!e.target) {
        return;
      }
      const originalImgInput = e.target as HTMLInputElement;
      if (originalImgInput.files != null && originalImgInput.files.length > 0) {
        const file: File = originalImgInput.files[0];
        if (!supportImageTypes.includes(file.type)) {
          throw new Error(`invalid image type. selected image type: ${file.type}, support image types: ${supportImageTypes}`)
        }

        if (cropperTargetImageTypes.includes(file.type)) {
          this.loadingOriginalImg(file);
        } else {
          this.submitOriginalImage(file);
        }
      }
    },
    submitOriginalImage(file: File) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.$store.dispatch(UIActionTypes.UPLOAD_TEMP_IMAGE, formData)
        .then(tempImageDto => {
          this.$emit('handleUploadedImgDto', tempImageDto);
          this.destroy();
        })
        .finally(() => (this.isLoading = false));
    },
    submitCroppedImage() {
      if (!this.cropper) {
        throw new Error('[submit] cropper should be be undefined.');
      }
      const croppedCanvas = this.cropper.getCroppedCanvas();
      this.isLoading = true;
      croppedCanvas.toBlob((blob: Blob | null) => {
        if (blob === null) {
          throw new Error('[croppedCanvas.toBlob] blob should not be null');
        }
        const formData = new FormData();
        if (!this.selectedImageFile) {
          throw new Error('selectedImageFile should exist')
        }
        formData.append('file', blob, this.selectedImageFile.name);
        this.$store.dispatch(UIActionTypes.UPLOAD_TEMP_IMAGE, formData)
          .then(tempImageDto => {
            this.$emit('handleUploadedImgDto', tempImageDto);
            this.destroy();
          })
          .finally(() => (this.isLoading = false));
      });
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
img {
  height: auto;
  width: 100%;
}
</style>
