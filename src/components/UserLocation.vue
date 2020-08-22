<template>
    <div v-show="!isLoading">
        <div>
            <div class="text-center">
                모임에 참여할 지역을 선택 해주세요. <br>
                (원하는 지역은 <b>최대 3개까지</b> 가능합니다)
            </div>
            <div class="text-center mt-1">
                <v-chip v-for="stateSeq in selectedLocationSeqs"
                        :key="stateSeq"
                        small
                        close
                        class="mx-1 white--text lighten-1 mt-1"
                        color="indigo"
                        @click:close="toggleLocation(stateSeq)"
                >
                    {{ stateTextWithParent(stateSeq) }}
                </v-chip>
            </div>
        </div>
        <v-list>
            <v-list-group v-for="rootState in rootStates"
                          :key="rootState.seq"
                          no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="rootState.name"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subState in rootState.subStates"
                    :key="subState.seq"
                    @click="toggleLocation(subState.seq)"
                >
                    <v-list-item-action>
                        <v-checkbox
                            v-model="selectedLocationSeqs"
                            :value="subState.seq"
                            color="primary"
                            @click="toggleLocation(subState.seq)"
                        ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="subState.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import _ from '@/utils/lodashWrapper.js';
import { MESSAGE } from '@/utils/constant/message.js';
import { COMMON, IS_LOADING, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import {
    ADD_SELECTED_LOCATION_SEQS, REMOVE_SELECTED_LOCATION_SEQS,
    SELECTED_LOCATION_SEQS, USER,
} from '@/store/type/user_type.js';
import { REQUEST_STATE_TEMPLATE, ROOT_STATES, TEMPLATE } from '@/store/type/template_type.js';

const MAXIMUM_SELECTABLE_COUNT = 3;

export default {
    name: 'UserLocation',
    computed: {
        ...mapGetters(TEMPLATE, { rootStates: ROOT_STATES }),
        ...mapGetters(USER, { selectedLocationSeqs: SELECTED_LOCATION_SEQS }),
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
    },
    created() {
        if (_.isEmpty(this.rootStates)) {
            this[REQUEST_STATE_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_STATE_TEMPLATE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        ...mapMutations(USER, [REMOVE_SELECTED_LOCATION_SEQS, ADD_SELECTED_LOCATION_SEQS]),
        toggleLocation(targetStateSeq) {
            const indexToBeDeleted = _.findIndex(this.selectedLocationSeqs, stateId => _.isEqual(stateId, targetStateSeq));
            if (indexToBeDeleted >= 0) {
                this[REMOVE_SELECTED_LOCATION_SEQS](indexToBeDeleted);
                return;
            }
            if (this.selectedLocationSeqs.length >= MAXIMUM_SELECTABLE_COUNT) {
                this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.SELECT_LOCATION_OVER_COUNT));
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                return;
            }
            this[ADD_SELECTED_LOCATION_SEQS](targetStateSeq);
        },
        stateTextWithParent(targetStateSeq) {
            const parentIndex = this.getRootStateIndex(targetStateSeq);
            const rootState = this.rootStates[parentIndex];
            const targetState = rootState.subStates.find(({ seq }) => seq === targetStateSeq);
            return targetState ? targetState.superStateRoot : rootState.superStateRoot;
        },
        getRootStateIndex(targetStateSeq) {
            const number = (parseInt(targetStateSeq, 10) / 100);
            return parseInt(number - 1, 10);
        },
    },
};
</script>

<style scoped>
</style>
