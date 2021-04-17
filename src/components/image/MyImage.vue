<template>
  <v-img
    :src="imageUrl"
    :max-height="maxHeight"
    :height="height"
    :width="width"
    :aspect-ratio="aspectRatio"
    @click="$emit('click')"
    @error="error"
  >
    <template #placeholder>
      <slot name="placeholder" />
    </template>
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue';
import { Image } from '@/utils/common/image';

export default Vue.extend({
  name: 'MyImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    width: Number,
    height: Number,
    maxHeight: Number,
    maxWidth: Number,
    aspectRatio: Number,
  },
  data() {
    return {
      imageUrl: '' as string,
    }
  },
  computed: {
    image(): Image {
      return new Image(this.src);
    }
  },
  watch: {
    image() {
      this.imageUrl = this.image.webpImageUrl;
    }
  },
  mounted() {
    this.imageUrl = this.image.webpImageUrl;
  },
  methods: {
    error() {
      this.imageUrl = this.image.imageUrl;
    }
  }
});
</script>

<style scoped>

</style>
