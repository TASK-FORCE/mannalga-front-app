import { expect } from 'chai';
import sinon from 'sinon';
import authModule from '@/store/modules/auth.js';
import * as authApi from '@/apis/login.js';
import { APP_TOKEN, REQUEST_APP_TOKEN_BY_KAKAO_TOKEN, REQUEST_KAKAO_TOKEN_BY_CODE, SET_APP_TOKEN } from '@/store/type/auth_type.js';

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
                    data: {
                        appToken: 'appToken',
                        isRegistered: true,
                    },
                },
            };
            saveKakaoTokenAndGetAppToken.withArgs(kakaoTokenInfo).returns(response);

            // when
            const isRegistered = await actions[REQUEST_APP_TOKEN_BY_KAKAO_TOKEN]({ commit }, kakaoTokenInfo);

            // then
            expect(commit.withArgs(SET_APP_TOKEN, response.data.data.appToken).calledOnce).to.be.true;
            expect(isRegistered).to.be.equal(response.data.data.isRegistered);
        });
    });

    it('requestKakaoTokenByCode 정상 동작', async () => {
        // given
        const dispatch = sinon.spy();
        const code = '123';
        const response = {
            data: { data: { accessToken: '123' } },
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
        const appToken = 'appToken';

        // when
        mutations[SET_APP_TOKEN](state, appToken);

        // then
        expect(state[APP_TOKEN]).to.be.equal(appToken);
        expect(localStorage.getItem(APP_TOKEN)).to.be.equal(appToken);
    });

    it('토큰 제거', () => {
        // given
        const state = {
            [APP_TOKEN]: 'appToken',
        };
        localStorage.setItem(APP_TOKEN, 'token');

        // when
        mutations.removeAppToken(state);

        // then
        expect(state[APP_TOKEN]).to.be.empty;
        expect(localStorage.getItem(APP_TOKEN)).to.be.undefined;
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
