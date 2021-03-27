<template>
  <div
    class="tag"
    :class="resolveClass"
    :style="`background-color: ${bgColor}`"
    @click="$emit('click')"
  >
    <div class="tag-text">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SquareTag',
  props: {
    text: String,
    bgColor: String,
    blur: Boolean,
    small: Boolean,
  },
  computed: {
    resolveClass() {
      return {
        'blur': this.blur,
        'small': this.small,
      };
    },
  }
});
</script>

<style
  scoped
  lang="scss"
>
.tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 27px;
  line-height: 27px;
  border-radius: 7px;

  .tag-text {
    color: #FFFFFF;
    margin: auto 0 !important;
    font-size: 13px;
    font-weight: bold;
  }
}

.tag.blur {
  border: #9f9f9f 1px solid;

  .tag-text {
    color: #9f9f9f;
    font-weight: normal;
  }
}

.theme--dark {
  .tag-text {
    color: #FFFFFF;
  }

  .tag.blur {
    color: #666666;
    border: #666666 1px solid;

    .tag-text {
      color: #666666;
    }
  }
}

.small.tag {
  width: 40px !important;
  height: 18px !important;
  line-height: 18px !important;

  .tag-text {
    font-size: 10px !important;
  }
}
</style>
