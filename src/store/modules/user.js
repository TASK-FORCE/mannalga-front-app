import { postRegister, requestProfile, requestRegisterStatus, requestUserSettings } from '@/apis/user.js';
import {
    ADD_SELECTED_INTEREST_SEQS,
    ADD_SELECTED_REGIONS,
    CHANGE_PROFILE_NAME,
    GET_DEFAULT_PROFILE,
    GET_DEFAULT_USER_SETTINGS,
    POST_REGISTER,
    PROFILE,
    REMOVE_SELECTED_INTEREST_SEQS,
    REQUEST_PROFILE,
    REQUEST_REGISTER_STATUS,
    REQUEST_USER_SETTINGS,
    SELECTED_INTEREST_SEQS,
    SELECTED_REGIONS,
    SET_PROFILE,
    SET_USER_SETTINGS,
    USER_SETTINGS,
} from '@/store/type/user_type.js';
import { actionsLoadingTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    [PROFILE]: GET_DEFAULT_PROFILE(),
    [SELECTED_REGIONS]: {},
    [SELECTED_INTEREST_SEQS]: [],
    [USER_SETTINGS]: GET_DEFAULT_USER_SETTINGS(),
};

const getters = {
    [PROFILE]: (state) => state[PROFILE],
    [SELECTED_REGIONS]: (state) => state[SELECTED_REGIONS],
    [SELECTED_INTEREST_SEQS]: (state) => state[SELECTED_INTEREST_SEQS],
    [USER_SETTINGS]: (state) => state[USER_SETTINGS],
};

const mutations = {
    [SET_PROFILE](state, profile) {
        state.profile = profile;
    },
    [CHANGE_PROFILE_NAME](state, name) {
        state.profile.name = name;
    },
    [ADD_SELECTED_REGIONS](state, selectedRegion) {
        const { priority, value } = selectedRegion;
        state[SELECTED_REGIONS][priority] = value;
    },
    [REMOVE_SELECTED_INTEREST_SEQS](state, index) {
        state[SELECTED_INTEREST_SEQS].splice(index, 1);
    },
    [ADD_SELECTED_INTEREST_SEQS](state, stateNameWithRoot) {
        state[SELECTED_INTEREST_SEQS].push(stateNameWithRoot);
    },
    [SET_USER_SETTINGS](state, userSettings) {
        state[USER_SETTINGS] = userSettings;
    },
};

const actions = {
    [REQUEST_PROFILE]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const profile = await requestProfile();
            commit(SET_PROFILE, profile);
        });
    },
    [POST_REGISTER]({ commit }, registerInfo) {
        return actionsLoadingTemplate(commit, async () => {
            const registerRequestDto = RequestConverter.converterRegisterInfo(registerInfo);
            await postRegister(registerRequestDto);
        });
    },
    [REQUEST_REGISTER_STATUS]({ commit }, appToken) {
        return actionsLoadingTemplate(commit, async () => {
            const { isRegistered } = await requestRegisterStatus(appToken);
            return isRegistered;
        });
    },
    [REQUEST_USER_SETTINGS]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const userSettings = await requestUserSettings();
            commit(SET_USER_SETTINGS, userSettings);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
