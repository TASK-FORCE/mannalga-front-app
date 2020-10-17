<template>
    <v-card>
        <v-card-title class="pa-3"
                      v-text="title"
        />
        <v-divider />
        <v-card-text style="height: 300px;"
                     class="pa-0"
        >
            <v-list class="pt-0">
                <v-list-item-group>
                    <template v-for="region in regions">
                        <v-list-item :key="region.seq"
                                     @click="selectRegion(region)"
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
export default {
    name: 'BottomSheetRegionCard',
    props: {
        rootRegions: Array,
        canSelectRoot: Boolean,
    },
    data() {
        return {
            showRootRegions: true,
            title: '지역 선택',
            regions: this.rootRegions,
        };
    },
    watch: {
        rootRegions() {
            this.regions = this.rootRegions;
        },
    },
    methods: {
        selectRegion(region) {
            this.showRootRegions ? this.selectRootRegion(region) : this.selectSubRegion(region);
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
                this.title = '지역 선택';
                this.regions = this.rootRegions;
            }, 100);
        },
    },
};
</script>

<style scoped>

</style>
