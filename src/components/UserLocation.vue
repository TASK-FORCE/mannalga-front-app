<template>
    <div v-show="!isLoading">
        <div v-if="selectedLocations[priority]"
             class="text-center"
        >
            이전에 선택한 지역: {{ selectedLocations[priority].name }}
        </div>
        <v-list>
            <v-list-group v-for="rootState in rootStates"
                          :key="rootState.seq"
                          no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="rootState.name"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subState in rootState.subStates"
                    :key="subState.seq"
                    :disabled="alreadySelected(subState.seq)"
                    @click="toggleLocation(subState)"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="subState.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </div>
</template>

<script>
import { REGISTER_PATH } from '@/router/route_path_type.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'UserLocation',
    props: {
        priority: Number,
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        rootStates: () => gettersHelper.rootLocations(),
        selectedLocations: () => gettersHelper.selectedLocations(),
    },
    created() {
        actionsFetcherService.fetchInterestAndLocationTemplate(true, REGISTER_PATH.PROFILE_PATH);
    },
    mounted() {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(this.priority)) {
            this.$router.back();
        }
    },
    methods: {
        toggleLocation(location) {
            const selectedLocation = {
                priority: this.priority,
                value: { seq: location.seq, name: location.superStateRoot },
            };
            mutationsHelper.addSelectedLocations(selectedLocation);
            this.$router.back();
        },
        alreadySelected(seq) {
            for (const location of Object.values(this.selectedLocations)) {
                if (seq === location.seq) {
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
