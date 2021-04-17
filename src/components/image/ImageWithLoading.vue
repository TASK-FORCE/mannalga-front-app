<template>
  <MyImage
    :src="imgUrl"
    class="grey lighten-2"
    :max-height="height"
    :aspect-ratio="aspectRatio"
    @click="$emit('click')"
  >
    <template #placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
  </MyImage>
</template>

<script lang="ts">
import Vue from 'vue';
import MyImage from '@/components/image/MyImage.vue';

export default Vue.extend({
  name: 'ImageWithLoading',
  components: { MyImage },
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    aspectRatio: Number,
    height: Number,
  },
});
</script>

<style scoped>
</style>
