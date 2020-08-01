import { expect } from 'chai';
import sinon from 'sinon';
import authModule from '@/store/modules/auth.js';
import * as authApi from '@/apis/login.js';

describe('actions', () => {
    const { actions } = authModule;

    describe('requestAppTokenByKakaoToken', () => {
        const kakaoAppTokenFunction = sinon.stub(authApi, 'saveKakaTokenAndGetAppToken');
        const kakaoTokenInfo = { token: 'access' };
        it('requestAppTokenByKakaoToken 정상 동작', async () => {
            // given
            const commit = sinon.spy();
            const response = {
                data: {
                    appToken: 'appToken',
                    isFirstIssue: true,
                },
            };
            response.data.isFirstIssue = false;
            kakaoAppTokenFunction.withArgs(kakaoTokenInfo)
                .returns(response);

            // when
            const isFirstIssue = await actions.requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo);

            // then
            expect(commit.withArgs('setAppToken', response.data.appToken).calledOnce).to.be.true;
            expect(isFirstIssue).to.be.equal(response.data.isFirstIssue);
        });

        it('requestAppTokenByKakaoToken 예외 발생', async () => {
            // given
            const commit = sinon.spy();
            kakaoAppTokenFunction.withArgs(kakaoTokenInfo).throws('name');

            // when
            const { name } = await actions.requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo);

            // then
            expect(commit.withArgs('removeAppToken').calledOnce).to.be.true;
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
        sinon.stub(authApi, 'requestKakaoToken')
            .withArgs(code)
            .returns(response);

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
        const token = { accessToken: 'accessToken', refreshToken: 'refreshToken' };

        // when
        mutations.setAppToken(state, token);

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
