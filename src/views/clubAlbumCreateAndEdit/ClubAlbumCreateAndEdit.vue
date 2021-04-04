<template>
  <div>
    <SubmitHeader
      :title="headerTitle"
      :submitCallback="requestAlbumCreate"
      @back="$emit('back')"
    />
    <v-form
      ref="form"
      class="album-create-and-edit-form"
    >
      <v-text-field
        v-model="title"
        :rules="RULES.CLUB_ALBUM_TITLE"
        outlined
        hide-details
        class="pa-0"
        label="사진 제목"
      />
      <ImageSelectBox
        ref="imgSelectBox"
        class="mt-5 elevation-2"
        height="400"
        cropFreeSize
        @handleUploadedImage="changeToUploadedImage"
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import { RULES } from '@/utils/common/constant/rules';
import { UploadImageResponse } from '@/interfaces/common';
import { AlbumWriteRequest } from '@/interfaces/album';
import routerHelper from '@/router/RouterHelper';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';
import SubmitHeader from '@/components/header/SubmitHeader.vue';

export default Vue.extend({
  name: 'ClubAlbumCreateAndEdit',
  components: { SubmitHeader, ImageSelectBox },
  props: {
    headerTitle: {
      type: String,
      required: true,
    },
    submitCallback: {
      type: Function as PropType<(albumWriteRequest: AlbumWriteRequest) => Promise<void>>,
      required: true,
    }
  },
  data() {
    return {
      RULES,
      title: null as null | string,
      image: null as null | UploadImageResponse,
    };
  },
  methods: {
    requestAlbumCreate() {
      const form = this.$refs.form as HTMLFormElement;
      if (form.validate()) {
        if (this.image) {
          const albumWriteRequest: AlbumWriteRequest = {
            clubSeq: routerHelper.clubSeq(),
            title: this.title || '',
            image: { ...this.image },
          };
          return this.submitCallback(albumWriteRequest);
        } else {
          this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.SELECT_IMAGE_REQUIRE);
        }
      }
      return Promise.resolve();
    },
    changeToUploadedImage(uploadedImage: UploadImageResponse) {
      this.image = uploadedImage;
    },
  },
});
</script>

<style scoped>
.album-create-and-edit-form {
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
