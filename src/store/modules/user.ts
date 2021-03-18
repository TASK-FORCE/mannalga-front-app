import userApi from '@/apis/UserApi.ts';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import RequestConverter from '@/store/converter/RequestConverter.ts';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { ActionTypes, MutationTypes } from '@/store/type/methodTypes';
import { UserActionContext } from '@/store/type/actionContextTypes';
import { KakaoProfile, UserProfile, UserRegisterContext } from '@/interfaces/user';
import { Interest, Region, UploadImageResponse } from '@/interfaces/common';

export const state = {
    kakaoProfile: DefaultBuilder.kakaoProfile() as KakaoProfile,
    userProfile: DefaultBuilder.userProfile() as UserProfile,
    selectedRegions: [] as Region[],
    selectedInterests: [] as Interest[],
};
export type UserState = typeof state;

export const mutations = {
    [MutationTypes.SET_PROFILE](state: UserState, profile: KakaoProfile) {
        state.kakaoProfile = profile;
    },
    [MutationTypes.CHANGE_PROFILE_NAME](state: UserState, name: string) {
        state.kakaoProfile.name = name;
    },
    [MutationTypes.SET_SELECTED_REGIONS](state: UserState, selectedRegions: Region[]) {
        state.selectedRegions = selectedRegions;
    },
    [MutationTypes.SET_SELECTED_INTERESTS](state: UserState, selectedInterests: Interest[]) {
        state.selectedInterests = selectedInterests;
    },
    [MutationTypes.SET_USER_PROFILE](state: UserState, userProfile: UserProfile) {
        state.userProfile = userProfile;
    },
};
export type UserMutations = typeof mutations;

export const actions = {
    [ActionTypes.REQUEST_KAKAO_PROFILE]({ commit }: UserActionContext) {
        return actionsLoadingTemplate(async () => {
            const profile = await userApi.getKakaoProfile();
            commit(MutationTypes.SET_PROFILE, profile);
        });
    },
    [ActionTypes.REQUEST_REGISTER]({ commit }: UserActionContext, userRegisterContext: UserRegisterContext) {
        return actionsLoadingTemplate(async () => {
            const registerRequestDto = RequestConverter.convertRegisterInfo(userRegisterContext);
            await userApi.postRegister(registerRequestDto);
        });
    },
    [ActionTypes.REQUEST_USER_PROFILE]({ commit }: UserActionContext) {
        return actionsLoadingTemplate(async () => {
            const userProfile = await userApi.getUserProfile();
            commit(MutationTypes.SET_USER_PROFILE, userProfile);
        });
    },
    [ActionTypes.REQUEST_USER_REGIONS]({ commit }: UserActionContext) {
        return actionsLoadingTemplate(async () => {
            const selectedRegions = await userApi.getUserRegions();
            commit(MutationTypes.SET_SELECTED_REGIONS, selectedRegions);
        });
    },
    [ActionTypes.REQUEST_CHANGE_USER_REGIONS]({ commit }: UserActionContext, selectedRegions: Region[]) {
        return actionsNormalTemplate(
            async () => {
                const userRegionsChangeDto = RequestConverter.convertUserRegionsForChange(selectedRegions);
                await userApi.putUserRegions(userRegionsChangeDto);
            },
        );
    },
    [ActionTypes.REQUEST_USER_INTERESTS]({ commit }: UserActionContext) {
        return actionsLoadingTemplate(async () => {
            const selectedInterests = await userApi.getUserInterest();
            commit(MutationTypes.SET_SELECTED_INTERESTS, selectedInterests);
        });
    },
    [ActionTypes.REQUEST_CHANGE_USER_INTERESTS]({ commit }: UserActionContext, selectedInterests: Interest[]) {
        return actionsNormalTemplate(
            async () => {
                const userInterestsChangeDto = RequestConverter.convertUserInterestForChange(selectedInterests);
                await userApi.putUserInterests(userInterestsChangeDto);
            },
        );
    },
    [ActionTypes.REQUEST_CHECK_IS_MEMBER](): Promise<boolean> {
        return actionsNormalTemplate(async () => {
            const { isMember } = await userApi.getIsMember();
            return isMember;
        });
    },
    [ActionTypes.REQUEST_CHANGE_USER_PROFILE]({ commit, dispatch }: UserActionContext, userProfileImage: UploadImageResponse) {
        return actionsNormalTemplate(async () => {
            await userApi.patchUserProfileImage(userProfileImage);
            dispatch(ActionTypes.REQUEST_USER_PROFILE);
        });
    },
};
export type UserActions = typeof actions;
