<template>
    <div class="d-inline">
        <v-btn v-for="(interestGroupType, index) in interestGroupTypes"
               :key="index"
               fab
               width="24"
               height="24"
               outlined
               :color="interestGroupType.color"
               :class="index > 0 ? 'ml-2' : ''"
        >
            <v-icon class="interest-icon">{{ interestGroupType.icon }}</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { INTEREST_GROUP_TYPES } from '@/utils/constant/type_constant.js';

export default {
    name: 'InterestIcons',
    props: {
        interests: Array,
    },
    computed: {
        interestGroupTypes() {
            if (this.interests) {
                if (this.interests instanceof Array) {
                    const interestGroupTypes = this.interests.map(this.buildInterestGroupType);
                    return [...new Set(interestGroupTypes)];
                }
                return this.buildInterestGroupType(this.interests);
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
</script>

<style scoped>
.interest-icon {
    font-size: 17px !important;
}
</style>
