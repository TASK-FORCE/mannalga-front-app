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
            <div class="ml-3 w-100">
                <div>
                    <div class="interest-wrapper">
                        <InterestIcons :interestListWithPriority="[firstInterestWithPriority]"
                                       :maxSize="1"
                        />
                        <span class="ml-1 f-09">{{ firstInterestWithPriority.interest.name }}</span>
                    </div>
                    <div class="region-wrapper">
                        <RootRegionTag :rootRegionName="rootRegionName" />
                        <span class="ml-1 f-09">{{ firstRegion.name }}</span>
                    </div>
                </div>
                <div>
                    <span>{{ club.name }}</span>
                    <span class="f-08 float-right mr-2">
                        <v-icon>mdi-account-multiple</v-icon>
                        {{ club.userCount }}/{{ club.maximumNumber }}
                    </span>
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
