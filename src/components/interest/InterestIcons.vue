<template>
    <div class="d-inline">
        <v-btn v-for="(interestGroupVo, index) in interestGroupVos"
               :key="index"
               :color="interestGroupVo.color"
               fab
               height="20"
               width="20"
               outlined
               x-small
               :class="index > 0 ? 'ml-2' : ''"
        >
            <v-icon class="interest-icon">{{ interestGroupVo.icon }}</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { InterestUtils } from '@/utils/interest.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
    name: 'InterestIcons',
    props: {
        interestListWithPriority: Array,
        maxSize: Number,
    },
    computed: {
        interestGroupVos() {
            if (this.interestListWithPriority) {
                const interests = extractInterestsOrderByPriority(this.interestListWithPriority);
                const interestGroupVos = interests.map(InterestUtils.findInterestGroupVo);
                const interestGroupVoSet = [...new Set(interestGroupVos)];
                if (this.maxSize && this.maxSize > 0) {
                    return interestGroupVoSet.slice(0, this.maxSize);
                }
                return interestGroupVoSet;
            }
            return [];
        },
    },
};

function extractInterestsOrderByPriority(interestsWithPriority) {
    const sortByPriority = _.sortBy(interestsWithPriority, ({ priority }) => priority);
    return sortByPriority.map(({ interest }) => interest);
}
</script>

<style scoped>
.interest-icon {
    width: 14px !important;
    height: 14px !important;
    font-size: 14px !important;
}
</style>
