<template>
    <div v-show="!isLoading">
        <div v-if="selectedRegions[priority]"
             class="text-center"
        >
            이전에 선택한 지역: {{ selectedRegions[priority].name }}
        </div>
        <v-list>
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
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';
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
        actionsFetcherService.fetchInterestAndRegionTemplate(true, PATH.REGISTER.PROFILE);
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
                if (seq === region.seq) {
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
