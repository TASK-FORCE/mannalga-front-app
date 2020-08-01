import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import Login from '@/views/Login.vue';
import BaseSnackBar from '@/components/BaseSnackBar.vue';
import { LOGIN_FAIL, LOGIN_REQUIRE } from '@/utils/constant/message.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login.vue', () => {
    let actions;
    let store;

    beforeEach(() => {
        actions = {
            requestKakaoTokenByCode: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    actions,
                },
            },
        });
    });

    it('페이지 진입 시 ValidationFail일 경우 Snackbar를 보여준다.', async () => {
        // given
        const option = {
            mocks: {
                $route: {
                    query: { validationFail: true },
                },
            },
        };

        // when
        const wrapper = shallowMount(Login, option);
        const snackBar = wrapper.findComponent(BaseSnackBar);

        // then
        expect(snackBar.props('open')).to.be.true;
        expect(snackBar.props('message')).to.be.equal(LOGIN_REQUIRE);
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이라면 register로 routing 된다.', async () => {
        // given
        const code = '123';
        const $router = {
            push: sinon.spy(),
        };
        const option = {
            store,
            localVue,
            mocks: {
                $router,
                $route: {
                    query: { code },
                },
            },
        };
        actions.requestKakaoTokenByCode.returns(Promise.resolve(true));

        // when
        const wrapper = shallowMount(Login, option);
        await wrapper.vm.$nextTick();

        // then
        expect(actions.requestKakaoTokenByCode.called).to.be.true;
        expect($router.push.withArgs('/register').calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이 아니라면 main으로 routing 된다.', async () => {
        // given
        const code = '123';
        const $router = {
            push: sinon.spy(),
        };
        const option = {
            store,
            localVue,
            mocks: {
                $router,
                $route: {
                    query: { code },
                },
            },
        };
        actions.requestKakaoTokenByCode.returns(Promise.resolve(false));

        // when
        const wrapper = shallowMount(Login, option);
        await wrapper.vm.$nextTick();

        // then
        expect(actions.requestKakaoTokenByCode.called).to.be.true;
        expect($router.push.withArgs('/main').calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 예외가 발생하면 Snackbar가 보여진다.', async () => {
        // given
        const code = '123';
        const $router = {
            push: sinon.spy(),
        };
        const option = {
            store,
            localVue,
            mocks: {
                $router,
                $route: {
                    query: { code },
                },
            },
        };
        actions.requestKakaoTokenByCode.returns(Promise.reject(Error));

        // when
        const wrapper = shallowMount(Login, option);
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        const snackBar = await wrapper.findComponent(BaseSnackBar);

        // then
        expect(actions.requestKakaoTokenByCode.called).to.be.true;
        expect(snackBar.props('open')).to.be.true;
        expect(snackBar.props('message')).to.be.equal(LOGIN_FAIL);
    });
});
