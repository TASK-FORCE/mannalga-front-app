import userApi from '@/apis/UserApi.js';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.js';
import RequestConverter from '@/store/converter/RequestConverter.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.js';

const state = {
    kakaoProfile: DefaultBuilder.buildKakaoProfile(),
    selectedRegions: {},
    selectedInterests: [],
    userProfile: DefaultBuilder.buildUserProfile(),
};

const getters = {
    kakaoProfile: (state) => state.kakaoProfile,
    selectedRegions: (state) => state.selectedRegions,
    selectedInterests: (state) => state.selectedInterests,
    userProfile: (state) => state.userProfile,
};

const mutations = {
    setProfile(state, profile) {
        state.kakaoProfile = profile;
    },
    changeProfileName(state, name) {
        state.kakaoProfile.name = name;
    },
    setSelectedInterests(state, selectedInterests) {
        state.selectedInterests = selectedInterests;
    },
    setSelectedRegions(state, selectedRegions) {
        state.selectedRegions = selectedRegions;
    },
    setUserProfile(state, userProfile) {
        state.userProfile = userProfile;
    },
};

const actions = {
    requestKakaoProfile({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const profile = await userApi.getKakaoProfile();
            commit('setProfile', profile);
        });
    },
    postRegister({ commit }, registerInfo) {
        return actionsLoadingTemplate(commit, async () => {
            const registerRequestDto = RequestConverter.convertRegisterInfo(registerInfo);
            await userApi.postRegister(registerRequestDto);
        });
    },
    requestRegisterStatus({ commit }, appToken) {
        return actionsLoadingTemplate(commit, async () => {
            const { isRegistered } = await userApi.getRegisterStatus(appToken);
            return isRegistered;
        });
    },
    requestUserProfile({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const userProfile = await userApi.getUserProfile();
            commit('setUserProfile', userProfile);
        });
    },
    requestUserRegions({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const userRegions = await userApi.getUserRegions();
            const selectedRegions = userRegions.map(({ priority, region }) => region);
            commit('setSelectedRegions', selectedRegions);
        });
    },
    requestChangeUserRegions({ commit }, selectedRegions) {
        return actionsNormalTemplate(
            async () => {
                const userRegionsChangeDto = RequestConverter.convertUserRegionsForChange(selectedRegions);
                await userApi.putUserRegions(userRegionsChangeDto);
            },
        );
    },
    requestUserInterests({ commit }) {
        return actionsLoadingTemplate(commit, async () => {
            const selectedInterests = await userApi.getUserInterest();
            commit('setSelectedInterests', selectedInterests);
        });
    },
    requestChangeUserInterests({ commit }, selectedInterests) {
        return actionsNormalTemplate(
            async () => {
                const userInterestsChangeDto = RequestConverter.convertUserInterestForChange(selectedInterests);
                await userApi.putUserInterests(userInterestsChangeDto);
            },
        );
    },
    requestCheckIsMember() {
        return actionsNormalTemplate(async () => {
            const { isMember } = await userApi.getIsMember();
            return isMember;
        });
    },
    requestChangeUserProfile({ commit, dispatch }, userProfileDto) {
        return actionsNormalTemplate(async () => {
            await userApi.patchUserProfileImage(userProfileDto);
            dispatch('requestUserProfile');
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
