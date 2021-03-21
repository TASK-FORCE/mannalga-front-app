<template>
  <v-dialog
    :value="value"
    fullscreen
    persistent
    max-width="1800"
  >
    <div class="header">
      <v-btn
        class="pl-1 mt-1 white--text"
        icon
        @click="close"
      >
        <v-icon
          large
          v-text="'$close'"
        />
      </v-btn>
    </div>
    <div class="image-dialog-wrapper black-bg">
      <v-carousel
        v-model="carouselNum"
        :show-arrows="imgUrls.length > 1"
        hide-delimiters
        class="image-dialog-carousel"
      >
        <v-carousel-item
          v-for="(path, index) in imgUrls"
          :key="index"
        >
          <v-sheet
            class="image-dialog__sheet black-bg"
            height="100%"
            tile
          >
            <v-img
              :src="path"
              class="image-dialog__sheet-image"
            />
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-footer
      fixed
      class="black-bg"
      style="height: 60px"
      app
    >
      <slot name="footer" />
    </v-footer>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ImageCarouselDialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    imgUrls: {
      type: Array,
      default: () => [],
      validator: (array) => array.length > 0,
    },
  },
  data() {
    return {
      carouselNum: 0,
    };
  },
  mounted() {
    if (!Array.isArray(this.imgUrls) || this.imgUrls.length < 1) {
      this.close();
    }
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.header {
  position: fixed;
  top: 0;
  height: 60px;
  padding: 4px;
  background-color: #0e0e0e;
  z-index: 5;
}

.image-dialog-wrapper {
  height: 100% !important;

  .image-dialog__sheet {
    position: relative;

    .image-dialog__sheet-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }

  .image-dialog-carousel {
    height: 100% !important;
    padding: 60px 0;
  }
}
</style>
