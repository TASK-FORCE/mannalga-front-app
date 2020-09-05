<template>
    <v-bottom-sheet v-model="sheet"
                    scrollable
    >
        <template v-slot:activator="{ on, attrs }">
            <div class="field-wrapper">
                <v-text-field class="pa-0"
                              label="모임명"
                />
                <v-text-field class="pa-0"
                              append-icon="mdi-menu-down"
                              readonly
                              label="관심사"
                              :value="selectedInterest ? selectedInterest.name : ''"
                              v-bind="attrs"
                              v-on="on"
                              @click="changeBottomSheetComponent('INTEREST')"
                />
                <v-text-field class="pa-0"
                              append-icon="mdi-menu-down"
                              readonly
                              label="지역"
                              :value="selectedLocation ? selectedLocation.superStateRoot : ''"
                              v-bind="attrs"
                              v-on="on"
                              @click="changeBottomSheetComponent('LOCATION')"
                />
                <v-textarea outlined
                            label="모임설명"
                ></v-textarea>
            </div>
        </template>

        <BottomSheetInterestCard v-if="currentBottomSheetCard === 'INTEREST'"
                                 :rootInterests="interests"
                                 @selectSubInterest="selectClubInterest"
        />
        <BottomSheetLocationCard v-else-if="currentBottomSheetCard === 'LOCATION'"
                                 :rootStates="rootStates"
                                 @selectSubState="selectClubLocation"
        />
    </v-bottom-sheet>
</template>

<script>
import BottomSheetLocationCard from '@/components/bottom-sheet/BottomSheetLocationCard.vue';
import BottomSheetInterestCard from '@/components/bottom-sheet/BottomSheetInterestCard.vue';
import { mapActions, mapGetters } from 'vuex';
import {
    INTERESTS,
    REQUEST_INTEREST_TEMPLATE,
    REQUEST_STATE_TEMPLATE,
    ROOT_STATES,
    TEMPLATE,
} from '@/store/type/template_type.js';
import _ from '@/utils/lodashWrapper.js';
import { OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { MESSAGE } from '@/utils/constant/constant.js';

export default {
    name: 'ClubCreateBox',
    components: { BottomSheetInterestCard, BottomSheetLocationCard },
    data() {
        return {
            sheet: false,
            selectedInterest: null,
            selectedLocation: null,
            currentBottomSheetCard: '',
        };
    },
    computed: {
        ...mapGetters(TEMPLATE, { rootStates: ROOT_STATES, interests: INTERESTS }),
    },
    created() {
        if (_.isEmpty(this[ROOT_STATES])) {
            this[REQUEST_STATE_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }

        if (_.isEmpty(this[INTERESTS])) {
            this[REQUEST_INTEREST_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_STATE_TEMPLATE, REQUEST_INTEREST_TEMPLATE]),
        changeBottomSheetComponent(cardComponent) {
            this.currentBottomSheetCard = cardComponent;
        },
        selectClubInterest(interest) {
            this.sheet = false;
            this.selectedInterest = interest;
        },
        selectClubLocation(location) {
            this.sheet = false;
            this.selectedLocation = location;
        },
    },
};
</script>

<style scoped>
.field-wrapper {
    margin-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>
