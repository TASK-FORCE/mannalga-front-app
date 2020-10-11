<template>
    <div>
        <v-list-item :key="club.seq"
                     :to="`/club/${club.seq}`"
                     class="pa-3"
        >
            <v-img :src="imgUrl"
                   max-width="60"
                   max-height="50"
            />
            <div class="ml-5">
                <div>
                    <InterestIcons :interests="[firstInterest]" />
                    <span class="ml-1"
                          style="font-size: 0.9rem"
                    >
                                {{ firstRegion.name }}
                    </span>
                </div>
                <div class="mt-1">
                    {{ club.name }}
                </div>
            </div>
            <v-spacer />
            <div class="text-body-2 mr-3">
                <div style="font-size: 0.8rem">
                    {{ club.userCount }}/{{ club.maximumNumber }}
                </div>
            </div>
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import { INTEREST_GROUP_TYPES } from '@/utils/constant/type_constant.js';
import InterestIcons from '@/components/InterestIcons.vue';

export default {
    name: 'ClubPost',
    components: { InterestIcons },
    props: ['club'],
    computed: {
        firstRegion() {
            const { region } = this.club.regions.find(({ priority }) => priority === 1);
            return region;
        },
        firstInterest() {
            const { interest } = this.club.interests.find(({ priority }) => priority === 1);
            return interest;
        },
        interestGroupType() {
            const { interestGroup } = this.firstInterest;
            const interestGroupType = Object.values(INTEREST_GROUP_TYPES)
                .find(type => type.name === interestGroup.name);
            return interestGroupType || INTEREST_GROUP_TYPES.DEFAULT;
        },
        imgUrl() {
            return this.club.mainImageUrl || 'https://w7.pngwing.com/pngs/70/60/png-transparent-vue-js-javascript-library-github-github-angle-text-triangle.png';
        },
    },
};
</script>

<style scoped>
</style>
