<template>
    <v-form ref="clubCreateForm"
            class="club-create-form"
    >
        <v-text-field label="모임명"
                      :rules="RULES.CLUB_TITLE"
                      :value="clubCreateBoxInfo.title"
                      @input="value => $emit('inputTitle', value)"
        />
        <v-text-field label="관심사"
                      append-icon="mdi-menu-down"
                      readonly
                      :rules="RULES.CLUB_INTEREST"
                      :value="clubCreateInterest && clubCreateInterest.name"
                      @click="$emit('openBottomSheetCard', 'INTEREST')"
        />
        <v-text-field label="지역"
                      append-icon="mdi-menu-down"
                      readonly
                      :rules="RULES.CLUB_REGION"
                      :value="clubCreateRegion && clubCreateRegion.superRegionRoot"
                      @click="$emit('openBottomSheetCard', 'REGION')"
        />
        <v-select label="모임 최대 인원"
                  :rules="RULES.CLUB_MAXIMUM_NUMBER"
                  :items="items"
                  @change="value => $emit('selectMaximumNumber', value)"
        />
        <v-textarea label="모임설명"
                    outlined
                    :rules="RULES.CLUB_DESCRIPTION"
                    :value="clubCreateBoxInfo.description"
                    @input="value => $emit('inputDescription', value)"
        ></v-textarea>
    </v-form>
</template>

<script>
import { CLUB_MAXIMUM_NUMBER_LIST, RULES } from '@/utils/common/constant/constant.js';

export default {
    name: 'ClubCreateForm',
    props: {
        clubCreateBoxInfo: Object,
    },
    data() {
        return {
            items: CLUB_MAXIMUM_NUMBER_LIST,
            RULES,
        };
    },
    computed: {
        clubCreateInterest() {
            return this.clubCreateBoxInfo.interest;
        },
        clubCreateRegion() {
            return this.clubCreateBoxInfo.region;
        },
    },
    methods: {
        validate() {
            return this.$refs.clubCreateForm.validate();
        },
    },
};
</script>

<style scoped>
.v-text-field {
    padding: 0 !important;
}

.club-create-form {
    margin-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>
