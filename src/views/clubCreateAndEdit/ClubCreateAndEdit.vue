<template>
  <div>
    <SubmitHeader
      :title="title"
      :submitCallback="submit"
      @back="$emit('back')"
    />
    <div v-show="!$store.state.ui.loading">
      <ImageSelectBox
        class="image-box"
        text="모임 대표 사진 등록"
        height="140"
        :initImage="imageUrl"
        @handleUploadedImage="changeToUploadedImage"
      />
      <v-form
        ref="clubCreateForm"
        class="club-create-and-edit-form"
      >
        <v-text-field
          v-model="name"
          class="mt-4"
          label="모임명"
          hide-details
          outlined
          :rules="RULES.CLUB_TITLE"
        />
        <v-text-field
          label="관심사"
          hide-details
          outlined
          append-icon="$menuDown"
          readonly
          class="mt-4"
          :rules="RULES.CLUB_INTEREST"
          :value="selectedInterestNames"
          @click="interestDialog = true"
        />
        <v-text-field
          label="지역"
          hide-details
          outlined
          append-icon="$menuDown"
          readonly
          class="mt-4"
          :rules="RULES.CLUB_REGION"
          :value="selectedClubRegionNames"
          @click="regionDialog = true"
        />
        <v-select
          v-model="maximumNumber"
          label="모임 최대 인원"
          hide-details
          outlined
          class="mt-4"
          :rules="RULES.CLUB_MAXIMUM_NUMBER"
          :items="items"
        />
        <v-textarea
          v-model="description"
          label="모임설명을 작성해주세요"
          hide-details
          class="mt-4"
          outlined
          :rules="RULES.CLUB_DESCRIPTION"
        ></v-textarea>
      </v-form>
      <RegionSelectDialog
        v-model="regionDialog"
        :selectedRegions="selectedRegions"
        @selectRegions="regions => (selectedRegions = regions)"
      />
      <InterestSelectDialog
        v-model="interestDialog"
        :selectedInterests="selectedInterests"
        @selectInterests="interests => (selectedInterests = interests)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.ts';
import { createClubMaximumNumberList } from '@/utils/common/commonUtils.ts';
import { RULES } from '@/utils/common/constant/rules.ts';
import RegionSelectDialog from '@/components/region/RegionSelectDialog.vue';
import InterestSelectDialog from '@/components/interest/InterestSelectDialog.vue';
import { Interest, Region, UploadImageResponse } from '@/interfaces/common';
import { ClubWriteContext, ClubWriteRequest } from '@/interfaces/club';
import SubmitHeader from '@/components/header/SubmitHeader.vue';

export default Vue.extend({
  name: 'ClubCreateAndEdit',
  components: {
    SubmitHeader,
    InterestSelectDialog,
    RegionSelectDialog,
    ImageSelectBox,
  },
  props: {
    btnText: String,
    title: String,
    context: {
      type: Object as PropType<ClubWriteContext>,
      required: false,
    },
    submitClickCallback: {
      type: Function, // (dto) => {} : Promise
      required: true,
    },
  },
  data() {
    return {
      sheet: false,
      items: createClubMaximumNumberList(10, 100, 10),
      RULES,
      regionDialog: false,
      interestDialog: false,
      isEditPage: false,
      name: undefined as undefined | string,
      description: undefined as undefined | string,
      maximumNumber: undefined as undefined | number,
      imageUrl: undefined as undefined | string,
      selectedInterests: [] as Interest[],
      selectedRegions: [] as Region[],
    };
  },
  computed: {
    selectedClubRegionNames(): string {
      return this.selectedRegions
        .map(({ superRegionRoot }: Region) => superRegionRoot)
        .join(', ');
    },
    selectedInterestNames(): string {
      return this.selectedInterests
        .map(({ name }: Interest) => name)
        .join(', ');
    },
  },
  created() {
    regionAndInterestVuexService.dispatch(true);
  },
  mounted() {
    if (!this.context) {
      return;
    }
    this.name = this.context.name;
    this.description = this.context.description;
    this.maximumNumber = this.context.maximumNumber;
    this.imageUrl = this.context.imageUrl;
    this.selectedInterests = this.context.interestList || [];
    this.selectedRegions = this.context.regionList || [];
    this.isEditPage = true;
  },
  methods: {
    openBottomSheetCard() {
      this.sheet = true;
    },
    submit() {
      const clubCreateForm = this.$refs.clubCreateForm as HTMLFormElement;
      if (clubCreateForm.validate()) {
        return this.submitClickCallback(this.buildClubCreateDto());
      }
      return Promise.resolve();
    },
    buildClubCreateDto(): ClubWriteRequest {
      return {
        name: this.name as string,
        description: this.description as string,
        maximumNumber: this.maximumNumber as number,
        mainImageUrl: this.imageUrl as string,
        interestList: this.selectedInterests
          .map((interest, index) => ({
            priority: index + 1,
            seq: interest.seq,
          })),
        regionList: this.selectedRegions
          .map((region, index) => ({
            priority: index + 1,
            seq: region.seq,
          })),
      };
    },
    changeToUploadedImage({ absolutePath }: UploadImageResponse) {
      this.imageUrl = absolutePath;
    }
  },
});
</script>

<style
  scoped
  lang="scss"
>
.image-box {
  margin-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.v-text-field {
  margin: 8px 0;
}

.club-create-and-edit-form {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
