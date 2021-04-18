import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { IsMember, KakaoProfile, UserProfile, UserRegisterRequest } from '@/interfaces/user';
import { Interest, InterestWriteRequest, Region, RegionWriteRequest, UploadImageResponse } from '@/interfaces/common';

const userApi = {
  getIsMember(): Promise<IsMember> {
    return axios.get('/api/users/check-already-register')
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  getKakaoProfile(): Promise<KakaoProfile> {
    return axios.get('/api/users/kakao-profile')
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertProfile);
  },

  getUserProfile(): Promise<UserProfile> {
    return axios.get('/api/users/profile')
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  getUserRegions(): Promise<Region[]> {
    return axios.get('/api/users/regions')
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertUserRegions);
  },

  putUserRegions(regionWriteRequests: RegionWriteRequest[]) {
    return axios.put('/api/users/regions', regionWriteRequests);
  },

  postRegister(userRegisterRequest: UserRegisterRequest) {
    return axios.post('/api/users/regist', userRegisterRequest)
      .then(ResponseConverter.extractSuperInventionResponseData);
  },

  getUserInterest(): Promise<Interest[]> {
    return axios.get('/api/users/interests')
      .then(ResponseConverter.extractSuperInventionResponseData)
      .then(ResponseConverter.convertUserInterests);
  },

  putUserInterests(interestWriteRequests: InterestWriteRequest[]) {
    return axios.put('/api/users/interests', interestWriteRequests);
  },

  patchUserProfileImage(profileImage: UploadImageResponse) {
    return axios.patch('/api/users', { profileImage });
  },

  deleteWithdraw() {
    return axios.delete('/api/users/withdraw');
  }
}
export default userApi;
