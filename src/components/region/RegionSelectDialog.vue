<template>
  <v-dialog
    :value="value"
    persistent
    fullscreen
  >
    <v-card>
      <RegionSelect
        :selectedRegionsCallback="getSelectedRegions"
        :submitCallback="submit"
        :backCallback="close"
        title="지역 설정"
        isDialog
      >
        <template #header-title>
          모임 지역을 설정해주세요.
        </template>
        <template #header-description>
          최대 3개까지 선택 가능합니다.
        </template>
      </RegionSelect>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import RegionSelect from '@/components/region/RegionSelect.vue';
import { Region } from '@/interfaces/common';

export default Vue.extend({
  name: 'RegionSelectDialog',
  components: { RegionSelect },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    selectedRegions: {
      type: Array as PropType<Region[]>,
      required: true,
    },
  },
  methods: {
    getSelectedRegions(): Promise<Region[]> {
      return new Promise(resolve => resolve([...this.selectedRegions]));
    },
    submit(selectedRegions: Region[]) {
      this.$emit('selectRegions', selectedRegions);
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
