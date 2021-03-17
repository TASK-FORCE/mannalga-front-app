<template>
    <div v-show="!$store.state.common.loading">
        <ImageSelectBox
            class="image-box"
            text="모임 대표 사진 등록"
            height="140"
            :initImage="imageUrl"
            @handleUploadedImage="changeToUploadedImage"
        />
        <v-bottom-sheet
            v-model="sheet"
            scrollable
        >
            <template v-slot:activator="{}">
                <v-form
                    ref="clubCreateForm"
                    class="club-create-form"
                >
                    <v-text-field
                        v-model="name"
                        label="모임명"
                        hide-details
                        :rules="RULES.CLUB_TITLE"
                    />
                    <v-text-field
                        label="관심사"
                        hide-details
                        append-icon="$menuDown"
                        readonly
                        class="test"
                        :rules="RULES.CLUB_INTEREST"
                        :value="selectedInterestNames"
                        @click="interestDialog = true"
                    />
                    <v-text-field
                        label="지역"
                        hide-details
                        append-icon="$menuDown"
                        readonly
                        :rules="RULES.CLUB_REGION"
                        :value="selectedClubRegionNames"
                        @click="regionDialog = true"
                    />
                    <v-select
                        v-model="maximumNumber"
                        label="모임 최대 인원"
                        hide-details
                        :rules="RULES.CLUB_MAXIMUM_NUMBER"
                        :items="items"
                    />
                    <v-textarea
                        v-model="description"
                        label="모임설명을 작성해주세요"
                        hide-details
                        class="mt-5"
                        outlined
                        :rules="RULES.CLUB_DESCRIPTION"
                    ></v-textarea>
                </v-form>
            </template>
        </v-bottom-sheet>
        <CommonCenterBtn
            :text="btnText"
            color="primary"
            class="my-5"
            :outlined="true"
            :loading="loading"
            @click="click"
        />
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
</template>

<script lang="ts">
import Vue from 'vue';

import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import { createClubMaximumNumberList } from '@/utils/common/commonUtils.js';
import { RULES } from '@/utils/common/constant/rules.js';
import RegionSelectDialog from '@/components/region/RegionSelectDialog.vue';
import InterestSelectDialog from '@/components/interest/InterestSelectDialog.vue';
import { UploadImageResponse } from '../../interfaces/common';
import { ClubWriteRequest } from '@/interfaces/club';

export default Vue.extend({
    name: 'ClubCreateAndEditBody',
    components: {
        InterestSelectDialog,
        RegionSelectDialog,
        ImageSelectBox,
        CommonCenterBtn,
    },
    props: {
        btnText: String,
        /**
         * name
         * description
         * maximumNumber
         * imageUrl
         * interestList
         * regionList
         */
        context: {
            type: Object,
        },
        submitClickCallback: {
            type: Function, // (dto) => {} : Promise
            required: true,
        },
    },
    data() {
        return {
            sheet: false,
            loading: false,
            items: createClubMaximumNumberList(10, 100, 10),
            RULES,
            regionDialog: false,
            interestDialog: false,
            name: null,
            description: null,
            maximumNumber: null,
            imageUrl: null,
            selectedInterests: [],
            selectedRegions: [],
        };
    },
    computed: {
        selectedClubRegionNames() {
            return this.selectedRegions
                .map(({ superRegionRoot }) => superRegionRoot)
                .join(', ');
        },
        selectedInterestNames() {
            return this.selectedInterests
                .map(({ name }) => name)
                .join(', ');
        },
    },
    created() {
        regionAndInterestVuexService.dispatch(true, null);
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
    },
    methods: {
        openBottomSheetCard() {
            this.sheet = true;
        },
        selectClubInterest(interest) {
            this.sheet = false;
            this.interest = interest;
        },
        click() {
            if (this.$refs.clubCreateForm.validate()) {
                this.loading = true;
                this.submitClickCallback(this.buildClubCreateDto())
                    .finally(() => (this.loading = false));
            }
        },
        buildClubCreateDto(): ClubWriteRequest {
            return {
                name: this.name,
                description: this.description,
                maximumNumber: this.maximumNumber,
                mainImageUrl: this.imageUrl,
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

.club-create-form {
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>
