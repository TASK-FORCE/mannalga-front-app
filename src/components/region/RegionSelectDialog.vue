<template>
    <v-dialog :value="value"
              persistent
              fullscreen
    >
        <v-card>
            <RegionSelect :selectedRegionsCallback="getSelectedRegions"
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

<script>
import RegionSelect from '@/components/region/RegionSelect.vue';

export default {
    name: 'RegionSelectDialog',
    components: { RegionSelect },
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        selectedRegions: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getSelectedRegions() {
            return new Promise(resolve => resolve([...this.selectedRegions]));
        },
        submit(selectedRegions) {
            this.$emit('selectRegions', selectedRegions);
            this.close();
        },
        close() {
            this.$emit('input', false);
        },
    },
};
</script>

<style scoped>

</style>
