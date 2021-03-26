<template>
  <v-dialog
    :value="value"
    persistent
    fullscreen
  >
    <v-card>
      <InterestSelect
        :selectedInterestsCallback="getSelectedInterests"
        :submitCallback="submit"
        :backCallback="close"
        :maxSize="3"
        title="지역 설정"
        isDialog
      >
        <template #header-title>
          모임 관심사를 설정해주세요.
        </template>
        <template #header-description>
          최대 3개까지 선택 가능합니다.
        </template>
      </InterestSelect>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import InterestSelect from '@/components/interest/InterestSelect.vue';
import Vue from 'vue';
import { Interest } from '@/interfaces/common';

export default Vue.extend({
  name: 'InterestSelectDialog',
  components: { InterestSelect },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    selectedInterests: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getSelectedInterests() {
      return new Promise(resolve => resolve([...this.selectedInterests]));
    },
    submit(selectedInterests: Interest[]) {
      this.$emit('selectInterests', selectedInterests);
      this.close();
    },
    close() {
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped>

</style>
