<template>
  <v-btn
    fab
    class="btn"
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
      const style: any = {
        width: `${this.size}px !important`,
        height: `${this.size}px !important`,
      };
      if (this.left) {
        style.left = `${this.sideMargin}px`;
      } else {
        style.right = `${this.sideMargin}px`;
      }
      return style;
    },
    width(): number {
      return this.$store.state.ui.width;
    },
    sideMargin(): number {
      if (this.width <= 600) {
        return 16;
      }
      const diff = this.width - 600;
      return (diff / 2) + 16;
    }
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
.btn {
  position: fixed;
  border-radius: 50%;
  min-width: auto !important;
  z-index: 4;
  bottom: 10px;
}
</style>
