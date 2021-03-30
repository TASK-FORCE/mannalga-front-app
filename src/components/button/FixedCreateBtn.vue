<template>
  <v-btn
    fab
    :class="left ? 'left-btn' : 'right-btn'"
    :color="color || 'green'"
    :style="resolveSize"
    @click="click"
  >
    <v-icon
      class="white--text"
      :size="iconSize"
      v-text="'$plus'"
    />
  </v-btn>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'FixedCreateBtn',
  props: {
    color: String,
    path: String as PropType<string>,
    left: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 50,
    },
    iconSize: {
      type: Number,
      default: 24,
    },

  },
  computed: {
    resolveSize(): any {
      return {
        width: `${this.size}px !important`,
        height: `${this.size}px !important`,
      };
    },
  },
  methods: {
    click(): void {
      if (this.path) {
        this.$router.push(this.path);
      } else {
        this.$emit('click');
      }
    },
  },
});
</script>

<style scoped>
.right-btn {
  position: fixed;
  border-radius: 50%;
  min-width: auto !important;
  z-index: 4;
  right: 16px;
  bottom: 10px;
}

.left-btn {
  position: fixed;
  border-radius: 50%;
  min-width: auto !important;
  z-index: 4;
  left: 16px;
  bottom: 10px;
}
</style>
