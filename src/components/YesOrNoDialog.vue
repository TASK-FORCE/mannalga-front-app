<template>
  <v-dialog
    :value="value"
    @click:outside="$emit('input', false)"
  >
    <v-card class="yes-or-no-dialog">
      <div class="title">
        {{ title }}
      </div>
      <div class="px-4">
        <slot name="description" />
      </div>
      <div class="d-flex pb-3 pr-1">
        <v-spacer />
        <v-btn
          class="btn"
          text
          color="#2883C6"
          max-width="15"
          @click="close"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          class="btn"
          text
          color="#2883C6"
          :loading="loading"
          @click="submit"
        >
          {{ submitText }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import routerHelper from '@/router/RouterHelper.ts';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'YesOrNoDialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cancelText: {
      type: String,
      default: '취소',
    },
    submitText: {
      type: String,
      default: '확인',
    },
    submitPromiseCallback: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
  },
  data() {
    return {
      loading: false as boolean,
    };
  },
  computed: {
    clubSeq(): number {
      return routerHelper.clubSeq();
    }
  },
  beforeDestroy() {
    this.close();
  },
  methods: {
    submit(): void {
      this.loading = true;
      this.submitPromiseCallback()
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

.yes-or-no-dialog {
  .title {
    color: #292929;
    font-weight: 500;
    font-size: 17px !important;
    padding: 15px 20px 10px 20px;
  }

  .btn {
    padding: 0 !important;
    font-weight: bold;
    font-size: 15px;
  }
}

.theme--dark {
  .yes-or-no-dialog {
    .title {
      color: #F5F5F5;
    }
  }
}

</style>
