<template>
    <div v-show="!isLoading">
        <div v-if="selectedLocations[priority]"
             class="text-center"
        >
            이전에 선택한 지역: {{selectedLocations[priority].name}}
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
                    @click="toggleLocation(subState)"
                >
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
import { MESSAGE } from '@/utils/constant/constant.js';
import { COMMON, IS_LOADING, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { ADD_SELECTED_LOCATIONS, SELECTED_LOCATIONS, USER } from '@/store/type/user_type.js';
import { REQUEST_STATE_TEMPLATE, ROOT_STATES, TEMPLATE } from '@/store/type/template_type.js';

export default {
    name: 'UserLocation',
    props: {
        priority: Number,
    },
    computed: {
        ...mapGetters(TEMPLATE, { rootStates: ROOT_STATES }),
        ...mapGetters(COMMON, { isLoading: IS_LOADING }),
        ...mapGetters(USER, { selectedLocations: SELECTED_LOCATIONS }),
    },
    created() {
        if (_.isEmpty(this.rootStates)) {
            this[REQUEST_STATE_TEMPLATE]()
                .catch(() => this.$router.back()
                    .then(() => this[OPEN_SNACKBAR](buildSnackBarOption(MESSAGE.constant))));
        }
    },
    mounted() {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(this.priority)) {
            this.$router.back();
        }
    },
    methods: {
        ...mapActions(TEMPLATE, [REQUEST_STATE_TEMPLATE]),
        ...mapMutations(COMMON, [OPEN_SNACKBAR]),
        ...mapMutations(USER, [ADD_SELECTED_LOCATIONS]),
        toggleLocation(location) {
            const selectedLocation = {
                priority: this.priority,
                value: { seq: location.seq, name: location.superStateRoot },
            };
            this[ADD_SELECTED_LOCATIONS](selectedLocation);
            this.$router.back();
        },
    },
};
</script>

<style scoped>
</style>
