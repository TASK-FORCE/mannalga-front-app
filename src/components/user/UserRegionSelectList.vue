<template>
    <div>
        <div class="absolute-center text-center w-100">
            <div class="text-center mb-7">
                모임에 참여할 지역을 선택 해주세요. <br>
                (원하는 지역은 <b>최대 3개</b> 선택 가능합니다)
            </div>
            <div v-for="priority in prioritySize"
                 :key="priority"
                 class="my-7"
            >
                <div v-if="isSelected(priority)">
                    <v-btn class="selected-region-chip"
                           color="#2196f3"
                           label
                           outlined
                           :min-width="width"
                           :height="height"
                           @click="clickBtn(priority)"
                    >
                        <span>{{ getText(priority) }}</span>
                    </v-btn>
                </div>
                <v-btn v-else
                       outlined
                       :min-width="width"
                       :height="height"
                       @click="clickBtn(priority)"
                       v-text="`${priority}번째 지역`"
                />
            </div>
        </div>
        <v-bottom-sheet v-model="sheet"
                        scrollable
        >
            <BottomSheetRegionCard :selectedRegionSeqs="selectedRegionSeqs"
                                   @selectSubRegion="selectSubRegion"
            />
        </v-bottom-sheet>
        <slot name="footer" />
    </div>
</template>

<script>
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { PATH } from '@/router/route_path_type.js';
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';

export default {
    name: 'UserRegionSelectList',
    components: { BottomSheetRegionCard },
    props: {
        selectedRegions: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            prioritySize: 3,
            width: 170,
            height: 30,
            sheet: false,
            currentPriority: null,
        };
    },
    computed: {
        selectedRegionSeqs() {
            return Object.values(this.selectedRegions)
                .map(({ seq }) => seq);
        },
    },
    created() {
        regionAndInterestVuexService.dispatch(true, PATH.BACK);
    },
    methods: {
        getText(priority) {
            const { superRegionRoot } = this.selectedRegions[priority];
            const split = superRegionRoot.split('/');
            if (split.length === 2 && split[0] === split[1]) {
                return split[0];
            }
            return superRegionRoot;
        },
        isSelected(priority) {
            return !!this.selectedRegions[priority];
        },
        clickBtn(priority) {
            if (this.validate(priority)) {
                this.currentPriority = priority;
                this.sheet = true;
            }
        },
        validate(priority) {
            if (priority > 1) {
                for (let i = 1; i < priority; i++) {
                    if (!this.selectedRegions[i]) {
                        mutationsHelper.openSnackBar(`${i}번째 지역을 먼저 선택해주세요.`);
                        return false;
                    }
                }
            }
            return true;
        },
        selectSubRegion(region) {
            this.sheet = false;
            this.$emit('selectRegion', { priority: this.currentPriority, region });
        },
    },
};
</script>

<style scoped>
.absolute-center {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
}
</style>
