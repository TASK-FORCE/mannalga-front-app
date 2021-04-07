<template>
  <div
    v-ripple
    class="club-post"
  >
    <div class="pa-4 p-relative w-100">
      <div
        :key="club.seq"
        class="d-flex"
        @click="moveToClubDetailPage(club.seq)"
      >
        <v-img
          :src="imgUrl"
          height="105"
          width="105"
          style="border-radius: 5px;"
        />
        <RoleChip
          v-if="role && role !== 'MEMBER'"
          :role="role"
          class="role-chip"
        />
        <div class="club-info">
          <div class="club-title">
            {{ club.name }}
          </div>
          <div class="club-description">
            {{ club.description }}
          </div>
          <div class="sub-description">
            <v-icon
              size="12"
              class="sub-description-icon"
              v-text="'$mapMarker'"
            />
            {{ regionNames }}
          </div>
          <div class="d-flex sub-description mt-2">
            <div>
              <v-icon
                class="sub-description-icon"
                v-text="'$monitor'"
              />
              {{ interestNames }}
            </div>
            <v-spacer />
            <div>
              <v-icon
                small
                v-text="'$twoPeople'"
              />
              {{ club.userCount }}/{{ club.maximumNumber }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { generateParamPath, PATH } from '@/router/route_path_type.ts';
import RoleChip from '@/components/chip/RoleChip.vue';
import { ClubRole } from '@/utils/role.ts';
import clubDetailVuexService from '@/store/service/ClubDetailVuexService.ts';
import _ from '@/utils/common/lodashWrapper.ts';
import { ClubFeed } from '@/interfaces/clubList';
import { Interest, InterestWithPriority, Region, RegionWithPriority } from '@/interfaces/common';

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

export default Vue.extend({
  name: 'ClubPost',
  components: { RoleChip },
  props: {
    club: {
      type: Object as PropType<ClubFeed>,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
    myPost: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      roles: [ClubRole.MASTER, ClubRole.MEMBER, ClubRole.MANAGER],
    };
  },
  computed: {
    extractedRegions(): Region[] {
      return _.sortBy(this.club.regions, ({ priority }: RegionWithPriority) => priority)
        .map(({ region }: RegionWithPriority) => region);
    },
    extractedInterests(): Interest[] {
      return _.sortBy(this.club.interests, ({ priority }: InterestWithPriority) => priority)
        .map(({ interest }: InterestWithPriority) => interest);
    },
    regionNames(): string {
      return this.extractedRegions
        .map(this.getRegionName)
        .join(', ');
    },
    interestNames(): string {
      return this.extractedInterests
        .map(interest => interest.name)
        .join(', ');
    },
    imgUrl() {
      return this.club.mainImageUrl || require('@/images/default_club_image.png');
    },
  },
  methods: {
    moveToClubDetailPage(seq: number) {
      this.$router.push(generateParamPath(PATH.CLUB.MAIN, [seq]))
        .then(() =>
          clubDetailVuexService.dispatch(seq, true)
            .then(() => this.$router.push(PATH.CLUB_LIST))
        );
    },
    getRegionName(region: Region) {
      return region.superRegionRoot;
    },
  },
});
</script>
<style
  lang="scss"
  scoped
>

.club-post {

  border-bottom: 1px solid #F5F5F5;

  .role-chip {
    position: absolute;
    top: 10px;
    left: 5px;
  }

  .club-info {

    width: 100%;
    padding-left: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    .club-title {
      font-weight: bold;
      font-size: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .club-description {
      font-size: 12px;
      color: #666666;
      margin: 9px 0;
      height: 18px;
      line-height: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .sub-description {
      color: #666666;
      font-size: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .sub-description-icon {
        margin-right: 2px;
        width: 12px;
        height: 10px
      }
    }
  }
}

.theme--dark {
  .club-post {
    border-color: #292929;

    .club-description {
      color: #9F9F9F;
    }

    .sub-description {
      color: #9F9F9F;
    }
  }
}
</style>
