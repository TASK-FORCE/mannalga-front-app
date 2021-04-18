<template>
  <CommonHeader
    :title="title"
    :isDialog="isDialog"
    @back="$emit('back')"
  >
    <template #option>
      <v-btn
        text
        class="header-button"
        :loading="loading"
        @click="submit"
      >
        {{ submitText }}
      </v-btn>
    </template>
  </CommonHeader>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue';
import CommonHeader from '@/components/header/CommonHeader.vue';

export default Vue.extend({
  name: 'SubmitHeader',
  components: { CommonHeader },
  props: {
    title: String,
    isDialog: Boolean,
    submitCallback: {
      type: Function as PropType<() => any>,
      required: true,
    },
    submitText: {
      type: String,
      default: '완료',
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    submit() {
      this.loading = true;
      const result = this.submitCallback();
      if (result instanceof Promise) {
        result.finally(() => (this.loading = false));
      } else {
        this.loading = false;
      }
    },
  }
});
</script>

<style
  scoped
  lang="scss"
>

.header-button {
  color: #292929;
  font-weight: 500;
  font-size: 18px;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.theme--dark {
  .header-button {
    color: #F5F5F5;
  }
}
</style>
