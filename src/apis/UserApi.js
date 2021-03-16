import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';

class UserApi {
    getIsMember() {
        return axios.get('/api/users/check-already-register')
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getKakaoProfile() {
        return axios.get('/api/users/kakao-profile')
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertProfile);
    }

    getRegisterStatus(appToken) {
        return axios.get('/api/users/registStatus', { params: appToken })
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getUserProfile() {
        return axios.get('/api/users/profile')
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getUserRegions() {
        return axios.get('/api/users/regions')
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertUserRegions);
    }

    putUserRegions(userRegionsChangeDto) {
        return axios.put('/api/users/regions', userRegionsChangeDto);
    }

    postRegister(registerRequestDto) {
        return axios.post('/api/users/regist', registerRequestDto)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }

    getUserInterest() {
        return axios.get('/api/users/interests')
            .then(ResponseConverter.extractSuperInventionResponseData)
            .then(ResponseConverter.convertUserInterests);
    }

    putUserInterests(userInterestsChangeDto) {
        return axios.put('/api/users/interests', userInterestsChangeDto);
    }

    patchUserProfileImage(profileImage) {
        return axios.patch('/api/users', { profileImage });
    }
}

const userApi = new UserApi();
export default userApi;
