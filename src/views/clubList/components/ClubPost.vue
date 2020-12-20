<template>
    <div>
        <v-list-item :key="club.seq"
                     class="py-2 pl-0"
                     @click="moveToClubDetailPage(club.seq)"
        >
            <div>
                <v-img :src="imgUrl"
                       height="60"
                       width="80"
                />
                <RoleChip v-if="role"
                          :role="role"
                          class="role-chip"
                />
            </div>
            <div class="ml-3 w-100">
                <div>
                    <div v-if="firstInterestWithPriority"
                         class="interest-wrapper"
                    >
                        <InterestIcons :interestListWithPriority="[firstInterestWithPriority]"
                                       :maxSize="1"
                        />
                        <span class="ml-1 f-08">{{ firstInterestWithPriority.interest.name }}</span>
                    </div>
                    <div v-if="firstRegion"
                         class="region-wrapper"
                    >
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
import RoleChip from '@/components/role/RoleChip.vue';
import { CLUB_ROLE } from '@/utils/common/constant/constant.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.js';

export default {
    name: 'ClubPost',
    components: { RoleChip, RootRegionTag, InterestIcons },
    props: {
        club: Object,
        role: String,
    },
    data() {
        return {
            roles: [CLUB_ROLE.MASTER, CLUB_ROLE.MEMBER, CLUB_ROLE.MANAGER],
        };
    },
    computed: {
        firstRegion() {
            const regionWrapper = this.club.regions.find(({ priority }) => priority === 1);
            return regionWrapper ? regionWrapper.region : null;
        },
        firstInterestWithPriority() {
            return this.club.interests.find(({ priority }) => priority === 1);
        },
        badgeColor() {
            if (this.firstInterestWithPriority) {
                const { interest } = this.firstInterestWithPriority;
                return InterestUtils.findInterestGroupVo(interest).color;
            }
            return null;
        },
        rootRegionName() {
            return this.firstRegion.superRegionRoot.split('/')[0];
        },
        imgUrl() {
            return this.club.mainImageUrl || 'https://w7.pngwing.com/pngs/70/60/png-transparent-vue-js-javascript-library-github-github-angle-text-triangle.png';
        },
    },
    methods: {
        moveToClubDetailPage(seq) {
            this.$router.push(generateParamPath(PATH.CLUB.MAIN, [seq]))
                .then(() => clubDetailVuexService.dispatch(seq, true, PATH.CLUB_LIST));
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

.role-chip {
    position: absolute;
    top: -2px;
    left: -4px;
}
</style>
