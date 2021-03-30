<template>
  <div>
    <CommonHeader
      :title="title"
      :isDialog="isDialog"
      showSubmitBtn
      @back="backCallback"
      @submit="submit"
    />
    <div class="body">
      <div class="header">
        <div class="header-title">
          <slot name="header-title" />
        </div>
        <div class="header-description">
          <slot name="header-description" />
        </div>
      </div>
      <div class="mt-5">
        <div
          v-for="(region, index) in selectedRegions"
          :key="region.seq"
          class="mt-5"
        >
          <div class="px-16">
            <v-btn
              class="selected-btn"
              text
              @click="openSheet(index + 1)"
            >
              <div>{{ getText(region) }}</div>
            </v-btn>
          </div>
        </div>
        <div
          v-if="this.selectedRegions.length < maxSize"
          class="px-16 mt-5"
        >
          <v-btn
            class="select-btn"
            text
            @click="openSheet(null)"
          >
            <v-icon
              class="plus"
              v-text="'$plus'"
            />
          </v-btn>
        </div>
      </div>
    </div>
    <v-bottom-sheet
      v-model="sheet"
      scrollable
    >
      <BottomSheetRegionCard
        :selectedRegionSeqs="selectedRegionSeqs"
        :showCancelBtn="!!currentIndex"
        @selectSubRegion="selectSubRegion"
        @cancelSelectedRegion="cancelSelectedRegion"
      />
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { PATH } from '@/router/route_path_type.ts';
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.ts';
import CommonHeader from '@/components/header/CommonHeader.vue';
import { Region, RegionTree } from '@/interfaces/common';

export default Vue.extend({
  name: 'RegionSelect',
  components: { CommonHeader, BottomSheetRegionCard },
  props: {
    selectedRegionsCallback: {
      type: Function as PropType<() => Promise<Region[]>>,
    },
    backCallback: {
      type: Function as PropType<() => void>,
    },
    submitCallback: {
      type: Function as PropType<(selectedRegions: Region[]) => void>,
    },
    title: {
      type: String,
      required: true,
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxSize: 3,
      sheet: false,
      currentIndex: undefined as undefined | number,
      selectedRegions: [] as Region[],
    };
  },
  computed: {
    selectedRegionSeqs(): number[] {
      return this.selectedRegions.map(({ seq }: Region) => seq);
    },
  },
  created() {
    regionAndInterestVuexService.dispatch(true, PATH.BACK);
    if (this.selectedRegionsCallback) {
      this.selectedRegionsCallback()
        .then((selectedRegions: Region[]) => (this.selectedRegions = selectedRegions));
    }
  },
  methods: {
    getText({ superRegionRoot }: RegionTree) {
      const split = superRegionRoot.split('/');
      if (split.length === 2 && split[0] === split[1]) {
        return split[0];
      }
      return superRegionRoot;
    },
    selectSubRegion(region: RegionTree) {
      this.sheet = false;
      if (this.currentIndex) {
        this.selectedRegions.splice(this.currentIndex - 1, 1, region);
      } else {
        this.selectedRegions.push(region);
      }
    },
    openSheet(index: number) {
      this.currentIndex = index;
      this.sheet = true;
    },
    submit() {
      return this.submitCallback(this.selectedRegions);
    },
    cancelSelectedRegion() {
      if (!this.currentIndex) {
        throw Error('[cancelSelectedRegion] crrentIndex should not be undeifined');
      }
      this.selectedRegions.splice(this.currentIndex - 1, 1);
      this.sheet = false;
      this.currentIndex = undefined;
    },
  },
});
</script>

<style
  scoped
  lang="scss"
>
.body {
  width: 100%;
  text-align: center;

  .header {
    margin-top: 2rem;

    .header-title {
      font-weight: 600;
      font-size: 18px;
      color: #292929;
    }

    .header-description {
      margin-top: 2px;
      color: #292929;
      opacity: 0.57;
    }
  }

  .selected-btn {
    height: 60px;
    width: 100%;
    border-radius: 7px;
    font-size: 15px;
    font-weight: 600;
    background-color: #2883C6;
    color: #FFFFFF;
  }

  .select-btn {
    height: 60px;
    width: 100%;
    border-radius: 7px;
    background-color: #F5F5F5;
    border: 1px solid #D4D4D4;

    .plus {
      color: #9f9f9f;
    }
  }
}

.theme--dark {
  .body {
    .header {
      .header-title {
        color: #F5F5F5;
      }

      .header-description {
        color: #F5F5F5;
      }
    }

    .select-btn {
      background-color: #292929;
      border: 1px solid #3c3c3c;

      .plus {
        color: #666666;
      }
    }
  }
}
</style>
