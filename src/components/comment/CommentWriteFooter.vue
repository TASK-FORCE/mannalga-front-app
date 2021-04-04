<template>
  <div class="comment-writer-footer">
    <div class="d-flex w-100 h-100 align-center pr-1">
      <div
        class="my-auto flex-grow-1"
        style="max-width: 520px"
      >
        <v-text-field
          v-model="content"
          :placeholder="EMPTY_COMMENT_TEXT"
          hide-details
          solo
          class="pa-0 w-100"
        />
      </div>
      <div class="my-auto ml-3">
        <v-btn
          class="submit-btn"
          :loading="loading"
          @click="writeComment"
        >
          등록
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MESSAGE } from '@/utils/common/constant/messages.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'CommentWriteFooter',
  props: {
    requestWriteComment: {
      type: Function as PropType<(content: string) => Promise<any>>,
      default: () => (content: string) => Promise.resolve(),
    },
    postProcessor: {
      type: Function as PropType<() => any>,
      default: () => () => ({})
    },
  },
  data() {
    return {
      EMPTY_COMMENT_TEXT: MESSAGE.EMPTY_COMMENT_TEXT,
      content: undefined as undefined | string,
      loading: false,
    };
  },
  created() {
    this.$vuetify.application.footer = 60;
  },
  beforeDestroy() {
    this.$vuetify.application.footer = 0;
  },
  methods: {
    writeComment() {
      if (this.content) {
        this.loading = true;
        this.requestWriteComment(this.content)
          .then(() => {
            this.postProcessor();
            this.content = undefined;
          })
          .finally(() => (this.loading = false));
        return;
      }
      this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, this.EMPTY_COMMENT_TEXT);
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.comment-writer-footer {
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 5;
  width: 100%;
  background-color: white;

  .submit-btn {
    color: #FFFFFF;
    background-color: #2883C6;
    font-weight: bold;
    height: 33px;
    border-radius: 7px;
  }
}

.theme--dark {
  .comment-writer-footer {
    background-color: #1e1e1e;
  }
}
</style>
