import { expect } from 'chai';
import sinon from 'sinon';
import authModule from '@/store/modules/auth.js';
import * as authApi from '@/apis/login.js';
import { REMOVE_APP_TOKEN, REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, REQUEST_KAKAO_TOKEN_BY_CODE, SET_APP_TOKEN } from '@/store/type/auth_type.js';

describe('actions', () => {
    const { actions } = authModule;

    describe('requestAppTokenByKakaoToken', () => {
        const kakaoTokenInfo = { token: 'access' };

        let commit;
        let saveKakaoTokenAndGetAppToken;

        beforeEach(() => {
            commit = sinon.spy();
            saveKakaoTokenAndGetAppToken = sinon.stub(authApi, 'saveKakaoTokenAndGetAppToken');
        });

        afterEach(() => { saveKakaoTokenAndGetAppToken.restore(); });

        it('requestAppTokenByKakaoToken 정상 동작', async () => {
            // given
            const response = {
                data: {
                    appToken: 'appToken',
                    isFirstIssue: true,
                },
            };
            saveKakaoTokenAndGetAppToken.withArgs(kakaoTokenInfo).returns(response);

            // when
            const isFirstIssue = await actions[REQUEST_APP_TOKEN_BY_KAKAO_TOKEN]({ commit }, kakaoTokenInfo);

            // then
            expect(commit.withArgs(SET_APP_TOKEN, response.data.appToken).calledOnce).to.be.true;
            expect(isFirstIssue).to.be.equal(response.data.isFirstIssue);
        });

        it('requestAppTokenByKakaoToken 예외 발생', async () => {
            // given
            saveKakaoTokenAndGetAppToken.withArgs(kakaoTokenInfo).throws('name');

            // when
            const { name } = await actions[REQUEST_APP_TOKEN_BY_KAKAO_TOKEN]({ commit }, kakaoTokenInfo);

            // then
            expect(commit.withArgs(REMOVE_APP_TOKEN).calledOnce).to.be.true;
            expect(name).to.be.equal('name');
        });
    });

    it('requestKakaoTokenByCode 정상 동작', async () => {
        // given
        const dispatch = sinon.spy();
        const code = '123';
        const response = {
            data: { accessToken: '123' },
        };
        sinon.stub(authApi, 'requestKakaoToken').withArgs(code).returns(response);

        // when
        await actions[REQUEST_KAKAO_TOKEN_BY_CODE]({ dispatch }, code);

        // then
        expect(dispatch.withArgs(REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, response.data).calledOnce).to.be.true;
    });
});

describe('mutations', () => {
    const { mutations } = authModule;

    it('토큰 세팅', () => {
        // given
        const state = {};
        const token = { accessToken: 'accessToken', refreshToken: 'refreshToken' };

        // when
        mutations[SET_APP_TOKEN](state, token);

        // then
        expect(state.accessToken).to.be.equal('accessToken');
        expect(localStorage.getItem('accessToken')).to.be.equal('accessToken');
        expect(localStorage.getItem('refreshToken')).to.be.equal('refreshToken');
    });

    it('토큰 제거', () => {
        // given
        const state = {
            accessToken: 'accessToken',
        };
        localStorage.setItem('accessToken', 'token');
        localStorage.setItem('refreshToken', 'token');

        // when
        mutations.removeAppToken(state);

        // then
        expect(state.accessToken).to.be.empty;
        expect(localStorage.getItem('accessToken')).to.be.undefined;
        expect(localStorage.getItem('refreshToken')).to.be.undefined;
    });
});

global.localStorage = {
    store: {},
    setItem(key, value) {
        this.store[key] = value;
    },
    getItem(key) {
        return this.store[key];
    },
    removeItem(key) {
        this.store[key] = undefined;
    },
    clear() {
        this.store = {};
    },
};
