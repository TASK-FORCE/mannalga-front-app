<template>
    <div v-show="!isLoading"
         class="mx-3"
    >
        <div class="text-center">
            관심사를 선택 해주세요. <br>
            (관심사는 최대 5개까지 선택 가능합니다)
        </div>
        <div v-for="rootInterest in rootInterests"
             :key="rootInterest.groupSeq"
             class="mt-3"
        >
            <div>
                <v-icon v-text="resolveIcon(rootInterest.name)" />
                {{ rootInterest.name }}
            </div>
            <div class="mt-2">
                <v-btn v-for="{seq, name} in rootInterest.interestList"
                       :key="seq"
                       outlined
                       :class="isInclude(seq)"
                       class="ma-1"
                       small
                       @click="toggleInterest(seq)"
                >
                    {{ name }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import _ from '@/utils/common/lodashWrapper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import { InterestUtils } from '@/utils/interest.js';

const MAXIMUM_SELECTABLE_COUNT = 5;

export default {
    name: 'UserInterestSelectList',
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        rootInterests: () => gettersHelper.rootInterests(),
        selectedInterestSeqs: () => gettersHelper.selectedInterestSeqs(),
    },
    created() {
        regionAndInterestVuexService.dispatch(true, PATH.BACK);
    },
    methods: {
        toggleInterest(targetSeq) {
            const toBeDeletedIndex = _.findIndex(this.selectedInterestSeqs, seq => seq === targetSeq);
            if (toBeDeletedIndex >= 0) {
                mutationsHelper.removeSelectedInterestSeqs(toBeDeletedIndex);
                return;
            }

            if (this.selectedInterestSeqs.length >= MAXIMUM_SELECTABLE_COUNT) {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_INTEREST_OVER_COUNT);
                return;
            }

            mutationsHelper.addSelectedInterestSeqs(targetSeq);
        },
        isInclude(seq) {
            const include = this.selectedInterestSeqs.includes(seq);
            return include ? 'active' : '';
        },
        resolveIcon(name) {
            return InterestUtils.findInterestGroupVoByName(name).icon;
        },
    },
};
</script>

<style scoped>
.active {
    background-color: green;
    color: white;
}
</style>
