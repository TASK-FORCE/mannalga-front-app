<template>
  <div :style="resolveStyle">
        <span class="my-auto">
            {{ info.name }}
        </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface ChipStyle {
  display?: string
  borderRadius?: string
  color?: string
  border?: string
  backgroundColor?: string
  padding?: string
  fontSize?: string
  fontWeight?: string
}

export default Vue.extend({
  name: 'Chip',
  props: {
    info: {
      type: Object,
      default: () => ({
        name: '',
        color: 'green',
      }),
    },
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Number,
      default: 30,
    },
    unBold: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    color() {
      return this.info.color;
    },
    resolveStyle() {
      const style: ChipStyle = {};
      style.display = 'flex';
      style.borderRadius = `${this.radius}px`;
      if (this.outlined) {
        style.color = this.color;
        style.border = `1px solid ${this.color}`;
      } else {
        style.color = 'white';
        style.backgroundColor = this.color;
      }
      if (this.small) {
        style.padding = '1px 4px';
        style.fontSize = '0.5rem';
      } else if (this.large) {
        style.padding = '4px 6px';
        style.fontSize = '0.8rem';
      } else {
        style.padding = '2px 4px';
        style.fontSize = '0.6rem';
      }
      if (!this.unBold) {
        style.fontWeight = 'bold';
      }
      return style;
    },
  },
});
</script>

<style scoped>
</style>
