<template>
    <v-card>
        <div class="title-wrapper">
            <v-btn
                v-show="!showRootRegions"
                icon
                class="title-back-btn my-auto"
                @click="showRoot"
            >
                <v-icon
                    size="28"
                    v-text="'$back'"
                />
            </v-btn>
            <div class="title-text">
                {{ title }}
            </div>
            <v-spacer />
            <v-btn
                v-if="showCancelBtn"
                class="cancel-btn"
                outlined
                small
                @click="$emit('cancelSelectedRegion')"
            >
                선택 취소
            </v-btn>
        </div>
        <v-divider />
        <v-card-text
            style="height: 300px;"
            class="pa-0"
        >
            <v-list class="pt-0">
                <div
                    v-for="region in getRegions()"
                    :key="region.seq"
                >
                    <v-list-item
                        :disabled="selectedRegionSeqs.includes(region.seq)"
                        @click="triggerRegion(region)"
                    >
                        {{ region.name }}
                    </v-list-item>
                </div>
            </v-list>
        </v-card-text>
        <v-divider />
    </v-card>
</template>

<script lang="ts">

import Vue from 'vue';
import { RegionTree } from '@/interfaces/common';

const TITLE = '지역 선택';

export default Vue.extend({
    name: 'BottomSheetRegionCard',
    props: {
        canSelectRoot: Boolean,
        showCancelBtn: {
            type: Boolean,
            default: false,
        },
        selectedRegionSeqs: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            showRootRegions: true,
            title: TITLE,
            regions: null,
            lastSelectedRegion: null,
        };
    },
    computed: {
        rootRegions(): RegionTree[] {
            return this.$store.state.common.rootRegions;
        },
    },
    methods: {
        showRoot() {
            this.showRootRegions = true;
            this.title = TITLE;
        },
        triggerRegion(region) {
            if (region) {
                this.lastSelectedRegion = region;
            }
            this.showRootRegions ? this.selectRootRegion(this.lastSelectedRegion) : this.selectSubRegion(this.lastSelectedRegion);
        },
        selectRootRegion(region) {
            this.title = region.name;
            this.regions = [...region.subRegions];
            if (this.canSelectRoot) {
                const rootRegion = { ...region };
                rootRegion.name += ' 전체';
                this.regions.unshift(rootRegion);
            }
            this.showRootRegions = false;
        },
        selectSubRegion(region) {
            this.$emit('selectSubRegion', region);
            this.$nextTick(() => {
                this.showRootRegions = true;
                this.title = TITLE;
            });
        },
        getRegions() {
            return this.showRootRegions ? this.rootRegions : this.regions;
        },
    },
});
</script>

<style
    scoped
    lang="scss"
>
.title-wrapper {
    height: 60px;
    line-height: 44px;
    padding: 0.5rem 1rem;
    display: flex;
    align-content: center;

    .title-back-btn {
        margin-right: 0.5rem;
    }

    .title-text {
        display: inline;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 500;
    }

    .cancel-btn {
        margin: auto 0;
        font-weight: 500;
        font-size: 14px;
        padding: 0 6px !important;
    }
}
</style>
