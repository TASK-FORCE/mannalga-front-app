<template>
  <v-dialog
    :value="value"
    persistent
  >
    <v-card class="comment-writer-box">
      <div class="comment-writer-box-title">
        {{ title }}
      </div>
      <div class="mt-4">
        <v-text-field
          v-model="content"
          :placeholder="emptyCommentText"
          outlined
          hide-details
        />
      </div>
      <div class="d-flex">
        <v-spacer />
        <div
          v-ripple
          class="btn"
          role="button"
          @click="close"
        >
          취소
        </div>
        <div
          v-ripple
          class="btn"
          role="button"
          @click="submit"
        >
          {{ submitText }}
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { UIMutationTypes } from '@/store/type/mutationTypes';
import { MESSAGE } from '@/utils/common/constant/messages';
import _ from '@/utils/common/lodashWrapper';

export default Vue.extend({
  name: 'CommentWriteDialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
    submitPromiseCallback: {
      type: Function as PropType<(content: string) => Promise<void>>,
      required: true,
    },
    initContent: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      loading: false as boolean,
      content: '' as string,
      emptyCommentText: MESSAGE.EMPTY_COMMENT_TEXT,
    };
  },
  mounted() {
    if (this.initContent) {
      this.content = this.initContent;
    }
  },
  methods: {
    submit(): void {
      if (_.isEmpty(this.content)) {
        this.$store.commit(UIMutationTypes.OPEN_SNACK_BAR, MESSAGE.EMPTY_COMMENT_TEXT);
        return;
      }
      this.loading = true;
      this.submitPromiseCallback(this.content)
        .finally(() => {
          this.loading = false;
          this.close();
        });
    },
    close(): void {
      this.$emit('input', false);
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.comment-writer-box {
  padding: 15px 20px;

  .comment-writer-box-title {
    font-weight: bold;
    color: #292929;
  }

  .btn {
    font-weight: bold;
    font-size: 15px;
    color: #2883C6;
    margin-top: 10px;
    margin-left: 15px;
  }
}

.theme--dark {
  .comment-writer-box {
    .comment-writer-box-title {
      color: #F5F5F5;
    }
  }
}

</style>
