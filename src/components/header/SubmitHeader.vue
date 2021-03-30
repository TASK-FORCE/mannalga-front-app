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
        @click="$emit('submit')"
      >
        완료
      </v-btn>
    </template>
  </CommonHeader>
</template>


<script lang="ts">
import Vue from 'vue';
import CommonHeader from '@/components/header/CommonHeader.vue';

export default Vue.extend({
  name: 'SubmitHeader',
  components: { CommonHeader },
  props: {
    title: String,
    isDialog: Boolean,
  },
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
