<template>
    <div>
        <CommonHeader :title="title"
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
            <div class="interest">
                <div v-for="rootInterest in rootInterests"
                     :key="rootInterest.groupSeq"
                >
                    <div class="interest-category">
                        {{ rootInterest.name }}
                    </div>
                    <v-btn v-for="interest in rootInterest.interestList"
                           :key="interest.seq"
                           outlined
                           :class="selectedInterestSeqs.includes(interest.seq) ? 'active' : ''"
                           class="interest-btn"
                           @click="toggleInterest(interest)"
                    >
                        {{ interest.name }}
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PATH } from '@/router/route_path_type.js';
import BottomSheetRegionCard from '@/components/bottom-sheet/BottomSheetRegionCard.vue';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';
import CommonHeader from '@/components/header/CommonHeader.vue';
import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.js';
import { MESSAGE } from '@/utils/common/constant/messages.js';
import _ from '@/utils/common/lodashWrapper.js';

export default {
    name: 'InterestSelect',
    components: { CommonHeader },
    props: {
        selectedInterestsCallback: {
            type: Function, // () => Promise(selectedInterest)
            default: () => new Promise(resolve => resolve([])),
        },
        backCallback: {
            type: Function,
        },
        submitCallback: {
            type: Function, // (selectedInterest) => ()
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
            maxSize: 5,
            sheet: false,
            currentIndex: null,
            selectedInterest: [],
        };
    },
    computed: {
        rootInterests: () => gettersHelper.rootInterests(),
        selectedInterestSeqs() {
            return this.selectedInterest.map(({ seq }) => seq);
        },
    },
    created() {
        regionAndInterestVuexService.dispatch(true, PATH.BACK);
        this.selectedInterestsCallback()
            .then(selectedInterest => (this.selectedInterest = selectedInterest));
    },
    methods: {
        toggleInterest(interest) {
            const toBeDeletedIndex = _.findIndex(this.selectedInterestSeqs, seq => seq === interest.seq);
            if (toBeDeletedIndex >= 0) {
                this.selectedInterest.splice(toBeDeletedIndex, 1);
                return;
            }

            if (this.selectedInterestSeqs.length >= this.maxSize) {
                mutationsHelper.openSnackBar(MESSAGE.SELECT_INTEREST_OVER_COUNT);
                return;
            }

            this.selectedInterest.push(interest);
        },
        submit() {
            return this.submitCallback(this.selectedInterest);
        },
    },
};
</script>

<style scoped
       lang="scss"
>
.body {
    width: 100%;

    .header {
        margin-top: 2rem;
        text-align: center;

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

    .interest {
        padding: 10px 24px;

        .interest-category {
            font-weight: 500;
            margin-top: 30px;
            font-size: 15px;
            color: #666666;
        }

        .interest-btn {
            margin-top: 10px;
            margin-right: 8px;
            font-size: 11px;
            height: 25px;
            min-width: 0 !important;
            padding: 2px 8px;
            border-radius: 7px;
            color: #666666;

            &.active {
                background-color: #2883C6;
                color: #FFFFFF;
            }
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

        .interest {
            padding: 10px 24px;

            .interest-category {
                color: #9F9F9F;
            }

            .interest-btn {
                color: #9F9F9F;

                &.active {
                    background-color: #2883C6;
                    border-color: #2883C6;
                    color: #FFFFFF;
                }
            }
        }
    }
}
</style>
