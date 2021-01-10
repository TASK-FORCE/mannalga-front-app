<template>
    <v-card>
        <div class="title-wrapper">
            <v-btn v-show="!showRootRegions"
                   icon
                   class="title-back-btn"
                   @click="showRoot"
            >
                <v-icon size="28"
                        v-text="'$back'"
                />
            </v-btn>
            <div class="title-text">
                {{ title }}
            </div>
        </div>
        <v-divider />
        <v-card-text style="height: 300px;"
                     class="pa-0"
        >
            <v-list class="pt-0">
                <v-list-item-group>
                    <template v-for="region in regions">
                        <v-list-item :key="region.seq"
                                     @click="triggerRegion(region)"
                        >
                            {{ region.name }}
                        </v-list-item>
                    </template>
                </v-list-item-group>
            </v-list>
        </v-card-text>
        <v-divider />
    </v-card>
</template>

<script>
const TITLE = '지역 선택';

export default {
    name: 'BottomSheetRegionCard',
    props: {
        rootRegions: Array,
        canSelectRoot: Boolean,
    },
    data() {
        return {
            showRootRegions: true,
            title: TITLE,
            regions: this.rootRegions,
            lastSelectedRegion: null,
        };
    },
    watch: {
        rootRegions() {
            this.regions = this.rootRegions;
        },
    },
    methods: {
        showRoot() {
            this.showRootRegions = true;
            this.regions = this.rootRegions;
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
            setTimeout(() => {
                this.showRootRegions = true;
                this.title = TITLE;
                this.regions = this.rootRegions;
            }, 100);
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.title-wrapper {
    height: 60px;
    line-height: 44px;
    padding: 0.5rem 1rem;

    .title-back-btn {
        margin-right: 0.5rem;
    }

    .title-text {
        display: inline;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 500;
    }
}
</style>
