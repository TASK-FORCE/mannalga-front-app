<template>
  <div
    class="name-avatar"
    :style="getBoxClass(name)"
  >
            <span
              class="name-avatar-text"
              :style="`font-size: ${size / 40}rem`"
            >
                {{ name }}
            </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TextAvatar',
  props: {
    name: String,
    size: {
      type: Number,
      default: 40,
    },
    bgColor: {
      type: String,
      default: 'white',
    },
  },
  methods: {
    getBoxClass(name: string | undefined) {
      if (!name) return {};
      const style = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        backgroundColor: this.bgColor,
        color: 'white',
      };
      if (this.bgColor === 'white') {
        style.color = '#2883C6';
      }
      return style;
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.name-avatar {
  border-radius: 50%;
  position: relative;

  .name-avatar-text {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
</style>
