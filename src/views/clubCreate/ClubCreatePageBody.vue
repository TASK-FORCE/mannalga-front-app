<template>
    <div>
        <ImageSelectBox class="image-box"
                        text="모임 대표 사진 등록"
                        height="140"
                        @handleImageUrl="value => clubCreateBoxInfo.imageUrl = value"
        />
        <v-bottom-sheet v-model="sheet"
                        scrollable
        >
            <template v-slot:activator="{}">
                <ClubCreateForm ref="clubCreateForm"
                                :clubCreateBoxInfo="clubCreateBoxInfo"
                                @openBottomSheetCard="openBottomSheetCard"
                                @inputTitle="value => clubCreateBoxInfo.title = value"
                                @inputDescription="value => clubCreateBoxInfo.description = value"
                                @selectMaximumNumber="value => clubCreateBoxInfo.maximumNumber = value"
                />
            </template>
            <BottomSheetInterestCard v-if="currentBottomSheetCard === 'INTEREST'"
                                     :rootInterests="rootInterests"
                                     @selectSubInterest="selectClubInterest"
            />
            <BottomSheetRegionCard v-else-if="currentBottomSheetCard === 'REGION'"
                                   :rootRegions="rootRegions"
                                   @selectSubRegion="selectClubRegion"
            />
        </v-bottom-sheet>
        <CommonCenterBtn text="모임 만들기"
                         color="primary"
                         :outlined="true"
                         :loading="loading"
                         @click="createClub"
        />
    </div>
</template>

<script>

import CommonCenterBtn from '@/components/button/CommonCenterBtn.vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import { MESSAGE } from '@/utils/common/constant/constant.js';
import ClubCreateForm from '@/views/clubCreate/components/ClubCreateForm.vue';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import { PATH } from '@/router/route_path_type.js';

export default {
    name: 'ClubCreatePageBody',
    components: {
        ClubCreateForm,
        ImageSelectBox,
        CommonCenterBtn,
        BottomSheetInterestCard,
        BottomSheetRegionCard,
    },
    data() {
        return {
            sheet: false,
            loading: false,
            currentBottomSheetCard: '',
            clubCreateBoxInfo: {
                title: null,
                description: null,
                maximumNumber: 30,
                imageUrl: null,
                interest: null,
                region: null,
            },
        };
    },
    computed: {
        rootInterests: () => gettersHelper.rootInterests(),
        rootRegions: () => gettersHelper.rootRegions(),
        clubCreateInterest() {
            return this.clubCreateBoxInfo.interest;
        },
        clubCreateRegion() {
            return this.clubCreateBoxInfo.region;
        },
    },
    created() {
        regionAndInterestVuexService.dispatch(true, PATH.CLUB_LIST);
    },
    methods: {
        openBottomSheetCard(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
            this.sheet = true;
        },
        selectClubInterest(interest) {
            this.sheet = false;
            this.clubCreateBoxInfo.interest = interest;
        },
        selectClubRegion(region) {
            this.sheet = false;
            this.clubCreateBoxInfo.region = region;
        },
        createClub() {
            if (this.$refs.clubCreateForm.validate()) {
                this.loading = true;
                actionsHelper.requestClubCreate(this.clubCreateBoxInfo)
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

<style scoped>
.image-box {
    margin-top: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>
