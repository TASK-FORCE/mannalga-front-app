import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import UserProfile from '@/components/user/UserProfile.vue';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { PATH } from '@/router/route_path_type.js';
import { testUtils } from '../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserProfile.Vue', () => {
    let gettersHelper;
    let actionsHelper;
    let store;
    let options;
    let $router;

    beforeEach(() => {
        const mockContext = testUtils.mockingAll(sandbox);
        gettersHelper = mockContext.gettersMock;
        actionsHelper = mockContext.actionsMock;
        $router = {
            push: sinon.spy(),
        };
        options = {
            store,
            localVue,
            mocks: {
                $router,
            },
        };
    });

    afterEach(() => { sandbox.restore(); });

    it('페이지 진입 시 profile이 비어있다면 profile을 요청한다.', () => {
        // given
        gettersHelper.profile.returns(DefaultBuilder.buildKakaoProfile());
        actionsHelper.requestKakaoProfile.returns(Promise.reject());

        // when
        shallowMount(UserProfile, options);

        // then
        expect(actionsHelper.requestKakaoProfile.called).to.be.true;
        expect($router.push.withArgs(PATH.LOGIN).notCalled).to.be.true;
    });

    it('페이지 진입 시 profile이 비어있지 않다면 profile을 요청하지 않는다.', () => {
        // given
        const newProfile = DefaultBuilder.buildKakaoProfile();
        newProfile.name = 'Jayden';
        gettersHelper.profile.returns(newProfile);

        // when
        shallowMount(UserProfile, options);

        // then
        expect(actionsHelper.requestKakaoProfile.called).to.be.false;
    });

    it('profile 요청 시 예외가 발생하면 login으로 라우팅된다.', async () => {
        // given
        gettersHelper.profile.returns(DefaultBuilder.buildKakaoProfile());
        actionsHelper.requestKakaoProfile.returns(Promise.reject());

        // when
        const wrapper = shallowMount(UserProfile, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.requestKakaoProfile.called).to.be.true;
        expect($router.push.withArgs(PATH.LOGIN).calledOnce).to.be.true;
    });
});
