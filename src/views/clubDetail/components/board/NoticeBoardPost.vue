<template>
  <div
    class="notice"
    @click="$emit('click')"
  >
    <div class="notice-text">
      [공지]
    </div>
    <div class="notice-title">
      {{ board.title }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { BoardFeed } from '@/interfaces/board/board';

export default Vue.extend({
  name: 'NoticeBoardPost',
  props: {
    board: {
      type: Object as PropType<BoardFeed>,
      required: true,
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.notice {
  display: flex;
  align-items: center;
  padding: 10px 25px;
  font-size: 15px;

  .notice-text {
    font-weight: bold;
    color: #2883C6;
  }

  .notice-title {
    margin-left: 13px;
  }
}
</style>
