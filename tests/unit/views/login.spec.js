import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import Login from '@/views/Login.vue';
import { MESSAGE } from '@/utils/constant/constant.js';
import { buildSnackBarOption } from '@/utils/snackbarUtils.js';
import { OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { IS_AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login.vue', () => {
    let actions;
    let store;
    let mutations;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        actions = {
            [REQUEST_KAKAO_TOKEN_BY_CODE]: sinon.stub(),
        };
        mutations = {
            [OPEN_SNACKBAR]: sinon.spy(),
        };
        getters = {
            [IS_AUTH]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                auth: {
                    namespaced: true,
                    getters,
                    actions,
                },
                common: {
                    namespaced: true,
                    mutations,
                },
            },
        });
        $router = {
            push: sinon.spy(),
        };
        options = {
            store,
            localVue,
            mocks: {
                $router,
                $route: {
                    query: null,
                },
            },
        };
        getters[IS_AUTH].returns(false);
    });

    it('페이지 진입 시 ValidationFail일 경우 openSnackbar를 호출한다.', async () => {
        // given
        options.mocks.$route.query = { validationFail: true };

        // when
        shallowMount(Login, options);

        // then
        expect(mutations[OPEN_SNACKBAR].withArgs({}, buildSnackBarOption(MESSAGE.LOGIN_REQUIRE)).calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이라면 register로 routing 된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actions[REQUEST_KAKAO_TOKEN_BY_CODE].returns(Promise.resolve(false));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actions[REQUEST_KAKAO_TOKEN_BY_CODE].called).to.be.true;
        expect($router.push.withArgs(REGISTER.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이 아니라면 main으로 routing 된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actions[REQUEST_KAKAO_TOKEN_BY_CODE].returns(Promise.resolve(true));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actions[REQUEST_KAKAO_TOKEN_BY_CODE].called).to.be.true;
        expect($router.push.withArgs(MAIN_PATH).calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 예외가 발생하면 Snackbar가 호출된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actions[REQUEST_KAKAO_TOKEN_BY_CODE].returns(Promise.reject(Error));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actions[REQUEST_KAKAO_TOKEN_BY_CODE].called).to.be.true;
        expect(mutations[OPEN_SNACKBAR].withArgs({}, buildSnackBarOption(MESSAGE.LOGIN_FAIL)).calledOnce).to.be.true;
    });
});
