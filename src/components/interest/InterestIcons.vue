<template>
    <div class="d-inline">
        <v-btn v-for="(interestGroupType, index) in interestGroupTypes"
               :key="index"
               fab
               height="25"
               width="25"
               outlined
               :color="interestGroupType.color"
               :class="index > 0 ? 'ml-2' : ''"
        >
            <v-icon class="interest-icon">{{ interestGroupType.icon }}</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { INTEREST_GROUP_TYPES } from '@/utils/common/constant/type_constant.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
    name: 'InterestIcons',
    props: {
        interestListWithPriority: Array,
        maxSize: Number,
    },
    computed: {
        interestGroupTypes() {
            if (this.interestListWithPriority) {
                const interests = extractInterestsOrderByPriority(this.interestListWithPriority);
                const interestGroupTypes = interests.map(this.buildInterestGroupType);
                const interestGroupTypeSet = [...new Set(interestGroupTypes)];
                if (this.maxSize && this.maxSize > 0) {
                    return interestGroupTypeSet.slice(0, this.maxSize);
                }
                return interestGroupTypeSet;
            }
            return [];
        },
    },
    methods: {
        buildInterestGroupType(interest) {
            const { interestGroup } = interest;
            const interestGroupType = Object.values(INTEREST_GROUP_TYPES)
                .find(type => type.name === interestGroup.name);
            return interestGroupType || INTEREST_GROUP_TYPES.DEFAULT;
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
    font-size: 15px !important;
}
</style>
