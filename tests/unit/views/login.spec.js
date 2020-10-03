import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import Login from '@/views/Login.vue';
import { IS_AUTH, REQUEST_KAKAO_TOKEN_BY_CODE } from '@/store/type/auth_type.js';
import { MAIN_PATH, REGISTER_PATH } from '@/router/route_path_type.js';
import { testUtils } from '../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login.vue', () => {
    let gettersHelper;
    let mutationsHelper;
    let actionsHelper;
    let options;
    let $router;

    beforeEach(() => {
        const mockContext = testUtils.mockingAll(sandbox);
        gettersHelper = mockContext.gettersMock;
        mutationsHelper = mockContext.mutationsMock;
        actionsHelper = mockContext.actionsMock;
        $router = {
            push: sinon.spy(),
        };
        options = {
            localVue,
            mocks: {
                $router,
                $route: {
                    query: null,
                },
            },
        };
        gettersHelper.isAuth.returns(false);
    });

    afterEach(() => { sandbox.restore(); });

    it('페이지 진입 시 ValidationFail일 경우 openSnackbar를 호출한다.', async () => {
        // given
        options.mocks.$route.query = { validationFail: true };

        // when
        shallowMount(Login, options);

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이라면 register로 routing 된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actionsHelper.requestKakaoTokenByCode.returns(Promise.resolve(false));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.requestKakaoTokenByCode.called).to.be.true;
        expect($router.push.withArgs(REGISTER_PATH.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 첫번째 발급이 아니라면 main으로 routing 된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actionsHelper.requestKakaoTokenByCode.returns(Promise.resolve(true));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.requestKakaoTokenByCode.called).to.be.true;
        expect($router.push.withArgs(MAIN_PATH).calledOnce).to.be.true;
    });

    it('페이지 진입 시 code가 존재하면 Token 요청 후 예외가 발생하면 Snackbar가 호출된다.', async () => {
        // given
        options.mocks.$route.query = { code: '123' };
        actionsHelper.requestKakaoTokenByCode.returns(Promise.reject(Error));

        // when
        const wrapper = shallowMount(Login, options);
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.requestKakaoTokenByCode.called).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });
});
