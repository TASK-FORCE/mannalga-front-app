<template>
    <div>
        <v-img
            :src="clubInfo.mainImageUrl || require('@/images/default_club_image.png')"
            aspect-ratio="2"
        />
        <div class="club-name">
            {{ clubInfo.name }}
        </div>
        <div class="club-interest-region-wrapper">
            <div class="d-flex align-center">
                <v-icon
                    size="17"
                    v-text="'$mapMarker'"
                />
                <span class="region-title">{{ clubRegionsText }}</span>
            </div>
            <div class="d-flex align-center mt-2">
                <WindMill :color="windMillColor" />
                <span class="interest-title">{{ clubInterestsText }}</span>
            </div>
        </div>
        <MiddleDivider
            class="mt-5"
            :height="1"
        />
        <div class="description-wrapper">
            <div
                class="description"
                v-text="description"
            />
        </div>
        <SnackBar
            :open="imageChangeSnackBarOpen"
            :snackBarOptions="imageChangeSnackBarOptions"
            btnText="추가"
            @click="$refs.imageSelector.trigger()"
        />
        <ImageSelectorWithConfirm
            ref="imageSelector"
            :imageChangeCallback="changeClubMainImage"
        >
            <template #image="{ imageUrl }">
                <v-img :src="imageUrl" />
            </template>
        </ImageSelectorWithConfirm>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import _ from '@/utils/common/lodashWrapper.js';
import ImageSelectorWithConfirm from '@/components/image/ImageSelectorWithConfirm.vue';
import SnackBar from '@/components/SnackBar.vue';
import WindMill from '@/components/icons/WindMill.vue';
import MiddleDivider from '@/components/MiddleDivider.vue';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import { SnackBarLocation, SnackBarOption } from '../../../../interfaces/common';
import { ActionTypes } from '@/store/type/methodTypes';
import { ClubInfo, ClubWriteRequest, CurrentUserInfo } from '@/interfaces/club';

const CHANGE_IMAGE_COOL_TIME_MINUTE = 6 * 60;
const toMillisecond = (minute) => minute * 60 * 1000;
const checkCoolTime = (clubSeq) => {
    const key = 'clubImageChangeSnackbarCoolTime';
    const timer = JSON.parse(localStorage.getItem(key)) || {};
    const time = timer[clubSeq];
    if (!time || time <= Date.now()) {
        timer[clubSeq] = Date.now() + toMillisecond(CHANGE_IMAGE_COOL_TIME_MINUTE);
        localStorage.setItem(key, JSON.stringify(timer));
        return true;
    }
    return false;
};

export default Vue.extend({
    name: 'ClubDetailMainClubInfo',
    components: {
        MiddleDivider,
        WindMill,
        SnackBar,
        ImageSelectorWithConfirm,
    },
    props: {
        clubInfo: {
            type: Object as PropType<ClubInfo>,
            required: true,
        },
        currentUserInfo: {
            type: Object as PropType<CurrentUserInfo>,
            required: true,
        },
    },
    data() {
        return {
            imageChangeSnackBarOpen: false,
            imageChangeSnackBarOptions: {
                message: MESSAGE.CLUB_MAIN_IMAGE_ADD_TEXT,
                location: SnackBarLocation.BOTTOM,
                time: 5000,
                open: true,
            } as SnackBarOption,
        };
    },
    computed: {
        description() {
            return this.clubInfo.description;
        },
        clubInterestsText() {
            return _.sortBy(this.clubInfo.clubInterest, ({ priority }) => priority)
                .map(({ interest }) => interest.name)
                .join(', ');
        },
        clubRegionsText() {
            return _.sortBy(this.clubInfo.clubRegion, ({ priority }) => priority)
                .map(({ region }) => region.superRegionRoot)
                .join(', ');
        },
        windMillColor() {
            if (this.$store.state.common.isDarkTheme) {
                return '#F5F5F5';
            }
            return '#666666';
        },
    },
    mounted() {
        if (!this.clubInfo.mainImageUrl && this.currentUserInfo.isMaster && checkCoolTime(this.clubInfo.seq)) {
            this.imageChangeSnackBarOpen = true;
        }
    },
    methods: {
        changeClubMainImage({ absolutePath }) {
            const clubWriteRequest: ClubWriteRequest = {
                name: this.clubInfo.name,
                description: this.clubInfo.description,
                maximumNumber: this.clubInfo.maximumNumber,
                mainImageUrl: absolutePath,
                interestList: this.clubInfo.clubInterest.map(({ interest, priority }) => ({
                    seq: interest.seq,
                    priority,
                })),
                regionList: this.clubInfo.clubRegion.map(({ region, priority }) => ({ seq: region.seq, priority })),
            };
            return this.$store.dispatch(ActionTypes.REQUEST_CLUB_CHANGE, {
                clubSeq: this.clubInfo.seq,
                clubWriteRequest,
            });
        },
    },
});
</script>
</script>

<style
    scoped
    lang="scss"
>

.club-name {
    font-size: 22px;
    font-weight: bold;
    margin-top: 15px;
    padding: 0 20px;
    color: #292929;
}

.club-interest-region-wrapper {
    padding: 0 20px;
    margin-top: 15px;

    .interest-title, .region-title {
        margin-left: 6px;
        font-size: .8rem;
        color: #292929;
    }
}

.description-wrapper {

    padding: 20px 15px;

    .description {
        font-size: 15px;
        color: #292929;
        white-space: pre-wrap;
        word-break: break-all;
        width: 100%;
    }
}

.theme--dark {
    .club-name, .interest-title, .region-title, .description {
        color: #F5F5F5;
    }
}
</style>
