<template>
    <div v-show="!isLoading">
        <ImageSelectBox class="image-box"
                        text="모임 대표 사진 등록"
                        height="140"
                        @handleImageUrl="value => imageUrl = value"
        />
        <v-bottom-sheet v-model="sheet"
                        scrollable
        >
            <template v-slot:activator="{}">
                <v-form ref="clubCreateForm"
                        class="club-create-form"
                >
                    <v-text-field v-model="title"
                                  label="모임명"
                                  hide-details
                                  :rules="RULES.CLUB_TITLE"
                    />
                    <v-text-field label="관심사"
                                  hide-details
                                  append-icon="$menuDown"
                                  readonly
                                  class="test"
                                  :rules="RULES.CLUB_INTEREST"
                                  :value="interest && interest.name"
                                  @click="openBottomSheetCard"
                    />
                    <v-text-field label="지역"
                                  hide-details
                                  append-icon="$menuDown"
                                  readonly
                                  :rules="RULES.CLUB_REGION"
                                  :value="selectedClubRegionNames"
                                  @click="dialog = true"
                    />
                    <v-select v-model="maximumNumber"
                              label="모임 최대 인원"
                              hide-details
                              :rules="RULES.CLUB_MAXIMUM_NUMBER"
                              :items="items"
                    />
                    <v-textarea v-model="description"
                                label="모임설명을 작성해주세요"
                                hide-details
                                class="mt-5"
                                outlined
                                :rules="RULES.CLUB_DESCRIPTION"
                    ></v-textarea>
                </v-form>
            </template>
            <BottomSheetInterestCard @selectSubInterest="selectClubInterest" />
        </v-bottom-sheet>
        <CommonCenterBtn text="모임 만들기"
                         color="primary"
                         class="mt-5"
                         :outlined="true"
                         :loading="loading"
                         @click="createClub"
        />
        <SelectRegionDialog v-model="dialog"
                            @selectRegions="selectRegions"
        />
    </div>
</template>

<script>

import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { PATH } from '@/router/route_path_type.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import { createClubMaximumNumberList } from '@/utils/common/commonUtils.js';
import { RULES } from '@/utils/common/constant/rules.js';
import _ from '@/utils/common/lodashWrapper.js';
import SelectRegionDialog from '@/components/region/SelectRegionDialog.vue';

export default {
    name: 'ClubCreatePageBody',
    components: {
        SelectRegionDialog,
        ImageSelectBox,
        CommonCenterBtn,
        BottomSheetInterestCard,
    },
    data() {
        return {
            sheet: false,
            loading: false,
            items: createClubMaximumNumberList(10, 100, 10),
            RULES,
            dialog: false,
            // dto
            title: null,
            description: null,
            maximumNumber: null,
            imageUrl: null,
            interest: null,
            selectedRegions: [],
        };
    },
    computed: {
        isLoading: () => gettersHelper.isLoading(),
        rootInterests: () => gettersHelper.rootInterests(),
        selectedClubRegionNames() {
            return _.sortBy(this.selectedRegions, ({ priority }) => priority)
                .map(({ region }) => region.superRegionRoot)
                .join(', ');
        },
    },
    created() {
        regionAndInterestVuexService.dispatch(true);
    },
    methods: {
        openBottomSheetCard() {
            this.sheet = true;
        },
        selectClubInterest(interest) {
            this.sheet = false;
            this.interest = interest;
        },
        selectRegions(selectedRegions) {
            this.selectedRegions = Object.keys(selectedRegions)
                .map(key => ({
                    priority: key,
                    region: selectedRegions[key],
                }));
        },
        createClub() {
            if (this.$refs.clubCreateForm.validate()) {
                this.loading = true;
                const clubCreateInfo = {
                    title: this.title,
                    description: this.description,
                    maximumNumber: this.maximumNumber,
                    imageUrl: this.imageUrl,
                    interest: this.interest,
                    selectedRegions: this.selectedRegions.map(({ priority, region }) => ({ priority, seq: region.seq })),
                };
                actionsHelper.requestClubCreate(clubCreateInfo)
                    .then(() => {
                        mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CLUB_CREATE);
                        this.$router.push(PATH.CLUB_LIST);
                    })
                    .finally(() => (this.loading = false));
            }
        },
    },
};
</script>

<style scoped
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
