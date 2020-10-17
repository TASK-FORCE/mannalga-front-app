<template>
    <div>
        <ImageSelectBox class="image-box"
                        text="모임 대표 사진 등록"
                        height="140"
                        @changeImageUrl="value => clubCreateBoxInfo.imageUrl = value"
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
                         :isLoading="isLoading"
                         @click="createClub"
        />
    </div>
</template>

<script>

import CommonCenterBtn from '@/components/ui/button/CommonCenterBtn.vue';
import ImageSelectBox from '@/components/image/ImageSelectBox.vue';
import BottomSheetInterestCard from '@/components/ui/bottom-sheet/BottomSheetInterestCard.vue';
import BottomSheetRegionCard from '@/components/ui/bottom-sheet/BottomSheetRegionCard.vue';
import { MESSAGE } from '@/utils/constant/constant.js';
import { MAIN_PATH } from '@/router/route_path_type.js';
import ClubCreateForm from '@/components/club/create/ClubCreateForm.vue';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

export default {
    name: 'ClubCreateBox',
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
            isLoading: false,
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
        actionsFetcherService.fetchInterestAndRegionTemplate(true, MAIN_PATH);
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
                this.isLoading = true;
                actionsHelper.requestClubCreate(this.clubCreateBoxInfo)
                    .then(() => this.$router.push(MAIN_PATH)
                        .then(() => mutationsHelper.openSnackBar(MESSAGE.SUCCESS_CLUB_CREATE)))
                    .catch(() => mutationsHelper.openSnackBar(MESSAGE.FAIL_CLUB_CREATE))
                    .finally(() => (this.isLoading = false));
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
