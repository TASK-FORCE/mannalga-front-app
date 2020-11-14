<template>
    <div>
        <v-list-item :key="club.seq"
                     :to="clubPath(club.seq)"
                     class="py-2 pl-0"
        >
            <v-img :src="imgUrl"
                   height="60"
                   width="80"
            />
            <div class="ml-3 w-100">
                <div>
                    <div class="interest-wrapper">
                        <InterestIcons :interestListWithPriority="[firstInterestWithPriority]"
                                       :maxSize="1"
                        />
                        <span class="ml-1 f-08">{{ firstInterestWithPriority.interest.name }}</span>
                    </div>
                    <div class="region-wrapper">
                        <RootRegionTag :color="badgeColor"
                                       :rootRegionName="rootRegionName"
                        />
                        <span class="ml-1 f-08">{{ firstRegion.name }}</span>
                    </div>
                </div>
                <div>
                    <span>{{ club.name }}</span>
                    <div class="d-inline-block float-right mr-2">
                        <span class="f-07">
                            <v-icon small>mdi-account-multiple</v-icon>
                            {{ club.userCount }}/{{ club.maximumNumber }}
                        </span>
                    </div>
                </div>
            </div>
        </v-list-item>
        <v-divider />
    </div>
</template>

<script>
import InterestIcons from '@/components/interest/InterestIcons.vue';
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import RootRegionTag from '@/components/region/RootRegionTag.vue';
import InterestUtils from '@/utils/interest/InterestUtils.js';

export default {
    name: 'ClubPost',
    components: { RootRegionTag, InterestIcons },
    props: ['club'],
    computed: {
        firstRegion() {
            const { region } = this.club.regions.find(({ priority }) => priority === 1);
            return region;
        },
        firstInterestWithPriority() {
            return this.club.interests.find(({ priority }) => priority === 1);
        },
        badgeColor() {
            const { interest } = this.firstInterestWithPriority;
            return InterestUtils.findInterestGroupVo(interest).color;
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
.interest-wrapper {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
    height: 25px;
}

.region-wrapper {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 5px;
    height: 25px;
}
</style>
