import {
    postRegister,
    requestChangeUserInterests,
    requestChangeUserRegions,
    requestKakaoProfile,
    requestRegisterStatus,
    requestUserInterest,
    requestUserProfile,
    requestUserRegions,
} from '@/apis/user.js';
import {
    ADD_SELECTED_INTEREST_SEQS,
    ADD_SELECTED_REGIONS,
    CHANGE_PROFILE_NAME,
    GET_DEFAULT_PROFILE,
    GET_DEFAULT_USER_SETTINGS,
    KAKAO_PROFILE,
    POST_REGISTER,
    REMOVE_SELECTED_INTEREST_SEQS,
    REQUEST_CHANGE_USER_INTEREST,
    REQUEST_CHANGE_USER_REGIONS,
    REQUEST_KAKAO_PROFILE,
    REQUEST_REGISTER_STATUS,
    REQUEST_USER_INTERESTS,
    REQUEST_USER_PROFILE,
    REQUEST_USER_REGIONS,
    SELECTED_INTEREST_SEQS,
    SELECTED_REGIONS,
    SET_PROFILE,
    SET_USER_PROFILE,
    USER_PROFILE,
} from '@/store/type/user_type.js';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/requestConverter.js';

const state = {
    [KAKAO_PROFILE]: GET_DEFAULT_PROFILE(),
    [SELECTED_REGIONS]: {},
    [SELECTED_INTEREST_SEQS]: [],
    [USER_PROFILE]: GET_DEFAULT_USER_SETTINGS(),
};

const getters = {
    [KAKAO_PROFILE]: (state) => state[KAKAO_PROFILE],
    [SELECTED_REGIONS]: (state) => state[SELECTED_REGIONS],
    [SELECTED_INTEREST_SEQS]: (state) => state[SELECTED_INTEREST_SEQS],
    [USER_PROFILE]: (state) => state[USER_PROFILE],
};

const mutations = {
    [SET_PROFILE](state, profile) {
        state[KAKAO_PROFILE] = profile;
    },
    [CHANGE_PROFILE_NAME](state, name) {
        state[KAKAO_PROFILE].name = name;
    },
    [ADD_SELECTED_REGIONS](state, selectedRegion) {
        const { priority, region } = selectedRegion;
        state[SELECTED_REGIONS][priority] = region;
    },
    [REMOVE_SELECTED_INTEREST_SEQS](state, index) {
        state[SELECTED_INTEREST_SEQS].splice(index, 1);
    },
    [ADD_SELECTED_INTEREST_SEQS](state, seq) {
        state[SELECTED_INTEREST_SEQS].push(seq);
    },
    [SET_USER_PROFILE](state, userProfile) {
        state[USER_PROFILE] = userProfile;
    },
};

const actions = {
    [REQUEST_KAKAO_PROFILE]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const profile = await requestKakaoProfile();
            commit(SET_PROFILE, profile);
        });
    },
    [POST_REGISTER]({ commit }, registerInfo) {
        return actionsLoadingTemplate(commit, async () => {
            const registerRequestDto = RequestConverter.convertRegisterInfo(registerInfo);
            await postRegister(registerRequestDto);
        });
    },
    [REQUEST_REGISTER_STATUS]({ commit }, appToken) {
        return actionsLoadingTemplate(commit, async () => {
            const { isRegistered } = await requestRegisterStatus(appToken);
            return isRegistered;
        });
    },
    [REQUEST_USER_PROFILE]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const userProfile = await requestUserProfile();
            commit(SET_USER_PROFILE, userProfile);
        });
    },
    [REQUEST_USER_REGIONS]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const userRegions = await requestUserRegions();
            userRegions.forEach(userRegion => commit(ADD_SELECTED_REGIONS, userRegion));
        });
    },
    [REQUEST_CHANGE_USER_REGIONS]({ commit }, selectedRegions) {
        return actionsNormalTemplate(async () => {
            const userRegionsChangeDto = RequestConverter.convertUserRegionsForChange(selectedRegions);
            await requestChangeUserRegions(userRegionsChangeDto);
        });
    },
    [REQUEST_USER_INTERESTS]({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const selectedInterestSeqs = await requestUserInterest();
            selectedInterestSeqs.forEach(seq => commit(ADD_SELECTED_INTEREST_SEQS, seq));
        });
    },
    [REQUEST_CHANGE_USER_INTEREST]({ commit }, selectedInterestSeqs) {
        return actionsNormalTemplate(async () => {
            const userInterestsChangeDto = RequestConverter.convertUserInterestForChange(selectedInterestSeqs);
            await requestChangeUserInterests(userInterestsChangeDto);
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
