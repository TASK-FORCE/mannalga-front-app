import { expect } from 'chai';
import sinon from 'sinon';
import authModule from '@/store/modules/auth.js';
import * as authApi from '@/apis/login.js';

describe('actions', () => {
    const kakaoAppTokenFunction = sinon.stub(authApi, 'saveKakaTokenAndGetAppToken');
    const { actions } = authModule;
    const kakaoTokenInfo = { token: 'access' };
    const result = {
        data: {
            appToken: 'appToken',
            isFirstIssue: true,
        },
    };

    it('requestAppTokenByKakaoToken 정상 동작', async () => {
        // given
        const commit = sinon.spy();
        result.data.isFirstIssue = false;
        kakaoAppTokenFunction.withArgs(kakaoTokenInfo).returns(result);

        // when
        const isFirstIssue = await actions.requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo);

        // then
        expect(commit.withArgs('setAppToken', result.data.appToken).calledOnce).to.be.true;
        expect(isFirstIssue).to.be.equal(result.data.isFirstIssue);
    });

    it('requestAppTokenByKakaoToken 예외 발생', async () => {
        // given
        const commit = sinon.spy();
        kakaoAppTokenFunction.withArgs(kakaoTokenInfo).throws('error');

        // when
        const { name } = await actions.requestAppTokenByKakaoToken({ commit }, kakaoTokenInfo);

        // then
        expect(commit.withArgs('removeAppToken').calledOnce).to.be.true;
        expect(name).to.be.equal('error');
    });
});

global.localStorage = {
    store: {},
    setItem(keyName, value) {
        this.store[keyName] = value;
    },
    getItem(keyName) {
        return this.store[keyName];
    },
    clear() {
        this.store = {};
    },
};
