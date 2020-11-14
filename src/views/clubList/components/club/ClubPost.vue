<template>
    <div>
        <v-list-item :key="club.seq"
                     :to="clubPath(club.seq)"
                     class="py-2 pl-0"
        >
            <v-img :src="imgUrl"
                   max-width="80"
                   height="60"
            />
            <div class="ml-3">
                <div>
                    <div class="interest-region-wrapper">
                        <InterestIcons
                            :interestWithPriority="club.interests"
                            :maxSize="1"
                        />
                        <VerticalBarDivider :margin="1" />
                        <RootRegionTag :rootRegionName="rootRegionName" />
                        <span class="ml-1 f-09">{{ firstRegion.name }}</span>
                    </div>
                </div>
                <div class="mt-1">{{ club.name }}</div>
            </div>
            <v-spacer />
            <div class="text-body-2 mr-3 user-count-wrapper">
                <div class="f-08">
                    <v-icon>mdi-account-multiple</v-icon>
                    {{ club.userCount }}/{{ club.maximumNumber }}
                </div>
            </div>
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import InterestIcons from '@/components/interest/InterestIcons.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import VerticalBarDivider from '@/components/VerticalBarDivider.vue';
import RootRegionTag from '@/components/region/RootRegionTag.vue';

export default {
    name: 'ClubPost',
    components: { RootRegionTag, VerticalBarDivider, InterestIcons },
    props: ['club'],
    computed: {
        firstRegion() {
            const { region } = this.club.regions.find(({ priority }) => priority === 1);
            return region;
        },
        rootRegionName() {
            return this.firstRegion.superRegionRoot.split('/')[0];
        },
        imgUrl() {
            return this.club.mainImageUrl || 'https://w7.pngwing.com/pngs/70/60/png-transparent-vue-js-javascript-library-github-github-angle-text-triangle.png';
        },
    },
    methods: {
        clubPath(seq) {
            return generateParamPath(PATH.CLUB.MAIN, [seq]);
        },
    },
};
</script>

<style lang="scss"
       scoped
>
.user-count-wrapper {
    position: absolute;
    right: 0;
    bottom: 10px;
}

.interest-region-wrapper {
    margin-bottom: 5px;
}
</style>
