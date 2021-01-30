<template>
    <div v-ripple>
        <div class="pa-4 p-relative">
            <div :key="club.seq"
                 class="d-flex"
                 @click="moveToClubDetailPage(club.seq)"
            >
                <div v-if="imgUrl">
                    <v-img :src="imgUrl"
                           :width="imageWidth"
                           height="105"
                           style="border-radius: 5px;"
                    />
                </div>
                <div v-else>
                    <div v-if="myPost"
                         style="width: 10px"
                    />
                </div>
                <RoleChip v-if="role"
                          :role="role"
                          class="role-chip"
                />
                <div class="px-4"
                     :style="resolveContentBoxStyle"
                >
                    <div class="club-title">
                        {{ club.name }}
                    </div>
                    <div class="club-description">
                        {{ club.description }}
                    </div>
                    <div class="sub-description">
                        <v-icon size="12"
                                class="sub-description-icon"
                                v-text="'$mapMarker'"
                        />
                        {{ regionNames }}
                    </div>
                    <div class="d-flex sub-description mt-2">
                        <div>
                            <v-icon class="sub-description-icon"
                                    v-text="'$monitor'"
                            />
                            {{ interestNames }}
                        </div>
                        <v-spacer />
                        <div>
                            <v-icon small
                                    v-text="'$twoPeople'"
                            />
                            {{ club.userCount }}/{{ club.maximumNumber }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-divider />
    </div>
</template>

<script>
import { generateParamPath, PATH } from '@/router/route_path_type.js';
import { InterestUtils } from '@/utils/interest.js';
import RoleChip from '@/components/chip/RoleChip.vue';
import { CLUB_ROLE } from '@/utils/role.js';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.js';
import _ from '@/utils/common/lodashWrapper.js';

const regionStore = {
    서울특별시: { name: '서울시' },
    대구광역시: { name: '대구시' },
    인천광역시: { name: '인천시' },
    대전광역시: { name: '대구시' },
    울산광역시: { name: '울산시' },
    세종특별자치시: { name: '세종시' },
    강원도: { name: '강원도' },
    경기도: { name: '경기도' },
    충청북도: { name: '충청도' },
    충청남도: { name: '충청도' },
    광주광역시: { name: '광주시' },
    전라북도: { name: '전라도' },
    전라남도: { name: '전라도' },
    부산광역시: { name: '부산시' },
    경상북도: { name: '경상도' },
    경상남도: { name: '경상도' },
    제주특별자치도: { name: '제주도' },
};

export default {
    name: 'ClubPost',
    components: { RoleChip },
    props: {
        club: Object,
        role: String,
        myPost: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            roles: [CLUB_ROLE.MASTER, CLUB_ROLE.MEMBER, CLUB_ROLE.MANAGER],
            imageWidth: 104,
        };
    },
    computed: {
        extractedRegions() {
            return _.sortBy(this.club.regions, ({ priority }) => priority)
                .map(({ region }) => region);
        },
        extractedInterests() {
            return _.sortBy(this.club.interests, ({ priority }) => priority)
                .map(({ interest }) => interest);
        },
        regionNames() {
            return this.extractedRegions
                .map(this.getRegionName)
                .join(', ');
        },
        interestNames() {
            return this.extractedInterests
                .map(interest => interest.name)
                .join(', ');
        },
        imgUrl() {
            return this.club.mainImageUrl;
        },
        resolveContentBoxStyle() {
            let minor = 16;
            if (this.club.mainImageUrl) {
                minor += 104;
            }
            const width = window.innerWidth - minor;
            return {
                width: `${width}px`,
            };
        },
    },
    methods: {
        moveToClubDetailPage(seq) {
            this.$router.push(generateParamPath(PATH.CLUB.MAIN, [seq]))
                .then(() => clubDetailVuexService.dispatch(seq, true, PATH.CLUB_LIST));
        },
        getRegionName(region) {
            return region.superRegionRoot;
        },
    },
};
</script>

<style lang="scss"
       scoped
>

.club-title {
    font-weight: bold;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.club-description {
    font-size: 12px;
    color: #666666;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 9px 0;
    height: 18px;
    line-height: 18px;
}

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
    top: 10px;
    left: 5px;
}

.sub-description {
    color: #666666;
    font-size: 11px;

    .sub-description-icon {
        margin-right: 2px;
        width: 12px;
        height: 10px
    }
}

.theme--dark {
    .club-description {
        color: #9F9F9F;
    }

    .sub-description {
        color: #9F9F9F;
    }
}
</style>
