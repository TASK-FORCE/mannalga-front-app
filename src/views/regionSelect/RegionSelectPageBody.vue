<template>
    <div v-show="!isLoading">
        <v-list class="py-0">
            <v-list-group v-for="rootRegion in rootRegions"
                          :key="rootRegion.seq"
                          no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="rootRegion.name"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subRegion in rootRegion.subRegions"
                    :key="subRegion.seq"
                    :disabled="alreadySelected(subRegion.seq)"
                    @click="toggleRegion(subRegion)"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="subRegion.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </div>
</template>

<script>
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'RegionSelectPageBody',
    props: {
        priority: Number,
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        rootRegions: () => gettersHelper.rootRegions(),
        selectedRegions: () => gettersHelper.selectedRegions(),
    },
    created() {
        regionAndInterestVuexService.dispatch(true, PATH.REGISTER.PROFILE);
    },
    mounted() {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(this.priority)) {
            this.$router.back();
        }
    },
    methods: {
        toggleRegion(region) {
            const selectedRegion = {
                priority: this.priority,
                region: { seq: region.seq, name: region.superRegionRoot },
            };
            mutationsHelper.addSelectedRegions(selectedRegion);
            this.$router.back();
        },
        alreadySelected(seq) {
            for (const region of Object.values(this.selectedRegions)) {
                if (seq === region.seq && !(this.selectedRegions[this.priority] && seq === this.selectedRegions[this.priority].seq)) {
                    return true;
                }
            }
            return false;
        },
    },
};
</script>

<style scoped>
</style>
