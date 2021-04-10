import userApi from '@/apis/UserApi.ts';
import { actionsLoadingTemplate, actionsNormalTemplate } from '@/store/utils/actionsTemplate.ts';
import RequestConverter from '@/apis/converter/RequestConverter.ts';
import StateInitializer from '@/store/utils/StateInitializer.ts';
import { UserMutationTypes } from '@/store/type/mutationTypes';
import { UserActionContext } from '@/store/type/actionContextTypes';
import { KakaoProfile, UserProfile, UserRegisterContext } from '@/interfaces/user';
import { Interest, Region, UploadImageResponse } from '@/interfaces/common';
import { UserActionTypes } from '@/store/type/actionTypes';

export const state = {
  kakaoProfile: StateInitializer.kakaoProfile() as KakaoProfile,
  userProfile: StateInitializer.userProfile() as UserProfile,
  selectedRegions: [] as Region[],
  selectedInterests: [] as Interest[],
};
export type UserState = typeof state;

export const mutations = {
  [UserMutationTypes.SET_PROFILE](state: UserState, profile: KakaoProfile) {
    state.kakaoProfile = profile;
  },
  [UserMutationTypes.CHANGE_PROFILE_NAME](state: UserState, name: string) {
    state.kakaoProfile.name = name;
  },
  [UserMutationTypes.SET_SELECTED_REGIONS](state: UserState, selectedRegions: Region[]) {
    state.selectedRegions = selectedRegions;
  },
  [UserMutationTypes.SET_SELECTED_INTERESTS](state: UserState, selectedInterests: Interest[]) {
    state.selectedInterests = selectedInterests;
  },
  [UserMutationTypes.SET_USER_PROFILE](state: UserState, userProfile: UserProfile) {
    state.userProfile = userProfile;
  },
};
export type UserMutations = typeof mutations;

export const actions = {
  [UserActionTypes.REQUEST_KAKAO_PROFILE]({ commit }: UserActionContext) {
    return actionsLoadingTemplate(async () => {
      const profile = await userApi.getKakaoProfile();
      commit(UserMutationTypes.SET_PROFILE, profile);
    });
  },
  [UserActionTypes.REQUEST_REGISTER]({ commit }: UserActionContext, userRegisterContext: UserRegisterContext) {
    return actionsLoadingTemplate(async () => {
      const registerRequestDto = RequestConverter.convertRegisterInfo(userRegisterContext);
      await userApi.postRegister(registerRequestDto);
    });
  },
  [UserActionTypes.REQUEST_USER_PROFILE]({ commit }: UserActionContext) {
    return actionsLoadingTemplate(async () => {
      const userProfile = await userApi.getUserProfile();
      commit(UserMutationTypes.SET_USER_PROFILE, userProfile);
    });
  },
  [UserActionTypes.REQUEST_USER_REGIONS]({ commit }: UserActionContext) {
    return actionsLoadingTemplate(async () => {
      const selectedRegions = await userApi.getUserRegions();
      commit(UserMutationTypes.SET_SELECTED_REGIONS, selectedRegions);
    });
  },
  [UserActionTypes.REQUEST_CHANGE_USER_REGIONS]({ commit }: UserActionContext, selectedRegions: Region[]) {
    return actionsNormalTemplate(
      async () => {
        const userRegionsChangeDto = RequestConverter.convertUserRegionsForChange(selectedRegions);
        await userApi.putUserRegions(userRegionsChangeDto);
      },
    );
  },
  [UserActionTypes.REQUEST_USER_INTERESTS]({ commit }: UserActionContext) {
    return actionsLoadingTemplate(async () => {
      const selectedInterests = await userApi.getUserInterest();
      commit(UserMutationTypes.SET_SELECTED_INTERESTS, selectedInterests);
    });
  },
  [UserActionTypes.REQUEST_CHANGE_USER_INTERESTS]({ commit }: UserActionContext, selectedInterests: Interest[]) {
    return actionsNormalTemplate(
      async () => {
        const userInterestsChangeDto = RequestConverter.convertUserInterestForChange(selectedInterests);
        await userApi.putUserInterests(userInterestsChangeDto);
      },
    );
  },
  [UserActionTypes.REQUEST_CHECK_IS_MEMBER](): Promise<boolean> {
    return actionsNormalTemplate(async () => {
      const { isMember } = await userApi.getIsMember();
      return isMember;
    });
  },
  [UserActionTypes.REQUEST_CHANGE_USER_PROFILE]({ commit, dispatch }: UserActionContext, userProfileImage: UploadImageResponse) {
    return actionsNormalTemplate(async () => {
      await userApi.patchUserProfileImage(userProfileImage);
      dispatch(UserActionTypes.REQUEST_USER_PROFILE);
    });
  },
};
export type UserActions = typeof actions;
