<template>
  <div>
    <ImageWithLoading
      :imgUrl="imgUrl"
      :height="height"
      @click="openDialog = true"
    />
    <ImageCarouselDialog
      v-model="openDialog"
      :imgUrls="[imgUrl]"
    />
  </div>
</template>

<script lang="ts">
import ImageWithLoading from '@/components/image/ImageWithLoading.vue';
import ImageCarouselDialog from '@/components/image/ImageCarouselDialog.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'ImageWithDialog',
  components: { ImageCarouselDialog, ImageWithLoading },
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    height: Number,
  },
  data() {
    return {
      openDialog: false,
    };
  },
});
</script>

<style scoped>

</style>
