<template>
    <div v-show="!isLoading">
        <div>
            <div class="text-center">
                모임에 참여할 지역을 선택 해주세요. <br>
                (원하는 지역은 <b>최대 3개까지</b> 가능합니다)
            </div>
            <div class="text-center mt-1">
                <v-chip v-for="stateNameWithRoot in selectedLocations"
                        :key="stateNameWithRoot"
                        small
                        close
                        class="mx-1 white--text lighten-1 mt-1"
                        color="indigo"
                        @click:close="toggleLocation(stateNameWithRoot)"
                >
                    {{stateNameWithRoot}}
                </v-chip>
            </div>
        </div>
        <v-list>
            <v-list-group v-for="rootState in rootStates"
                          :key="rootState.superStateRoot"
                          no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="rootState.name"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subState in rootState.subStates"
                    :key="subState.superStateRoot"
                    @click="toggleLocation(subState.superStateRoot)"
                >
                    <v-list-item-action>
                        <v-checkbox
                            v-model="selectedLocations"
                            :value="subState.superStateRoot"
                            color="primary"
                            @click="toggleLocation(rootState.name, subState.name)"
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
import { buildSnackBarOption } from '@/utils/commonUtils.js';
import { findIndex, isEmpty, isEqual } from '@/utils/lodashUtils.js';
import { MESSAGE } from '@/utils/constant/message.js';

export default {
    name: 'UserLocation',
    data() {
        return {
            paddingTop: 30,
        };
    },
    computed: {
        ...mapGetters('template', ['rootStates']),
        ...mapGetters('user', ['selectedLocations']),
        ...mapGetters('common', ['isLoading']),
        someStyle() {
            return {
                'padding-top': this.paddingTop,
            };
        },
    },
    created() {
        if (isEmpty(this.rootStates)) {
            this.requestStates()
                .catch(() => this.$router.back()
                    .then(() => this.openSnackBar(buildSnackBarOption(MESSAGE.SERVER_INSTABILITY))));
        }
    },
    beforeMount() {
        const fixedHeader = document.querySelector('#location-fixed-header');
        console.log(fixedHeader.clientHeight);
    },
    methods: {
        ...mapActions('template', ['requestStates']),
        ...mapMutations('common', ['openSnackBar']),
        ...mapMutations('user', ['removeSelectedLocations', 'addSelectedLocations']),
        toggleLocation(stateNameWithRoot) {
            const indexToBeDeleted = findIndex(this.selectedLocations, stateName => isEqual(stateName, stateNameWithRoot));
            if (indexToBeDeleted >= 0) {
                this.removeSelectedLocations(indexToBeDeleted);
                return;
            }
            if (this.selectedLocations.length >= 3) {
                this.openSnackBar(buildSnackBarOption(MESSAGE.SELECT_LOCATION_OVER_COUNT, undefined, undefined, 30000));
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                return;
            }
            this.addSelectedLocations(stateNameWithRoot);
        },
    },
};
</script>

<style scoped>
#location-fixed-header {
    position: fixed;
    width: 100%;
}
</style>
