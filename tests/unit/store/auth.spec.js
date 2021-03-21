import { expect } from 'chai';
import sinon from 'sinon';
import authModule from '@/store/modules/auth.ts';
import * as authApi from '@/apis/AuthApi.ts';

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
            const isRegistered = await actions.requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo);

            // then
            expect(commit.withArgs('setAppToken', response.data.data.appToken).calledOnce).to.be.true;
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
        await actions.requestKakaoTokenByCode({ dispatch }, code);

        // then
        expect(dispatch.withArgs('requestAppTokenByKakaoToken', response.data).calledOnce).to.be.true;
    });
});

describe('mutations', () => {
    const { mutations } = authModule;

    it('토큰 세팅', () => {
        // given
        const state = {};
        const appToken = 'appToken';

        // when
        mutations.setAppToken(state, appToken);

        // then
        expect(state.appToken).to.be.equal(appToken);
        expect(localStorage.getItem('appToken')).to.be.equal(appToken);
    });

    it('토큰 제거', () => {
        // given
        const state = {
            appToken: 'appToken',
        };
        localStorage.setItem('appToken', 'token');

        // when
        mutations.removeAppToken(state);

        // then
        expect(state.appToken).to.be.empty;
        expect(localStorage.getItem('appToken')).to.be.undefined;
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
