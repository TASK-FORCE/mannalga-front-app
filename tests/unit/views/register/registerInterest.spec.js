import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import RegisterInterestNestedPage from '@/views/register/RegisterInterestNestedPage.vue';
import { PATH } from '@/router/route_path_type.ts';
import StateInitializer from '@/store/utils/StateInitializer.ts';
import { testUtils } from '../../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterInterestNestedPage.vue', () => {
    let mutationsHelper;
    let gettersHelper;
    let actionsHelper;
    let options;
    let $router;

    beforeEach(() => {
        const mockContext = testUtils.mockingAll(sandbox);
        gettersHelper = mockContext.gettersMock;
        mutationsHelper = mockContext.mutationsMock;
        actionsHelper = mockContext.actionsMock;
        $router = {
            push: sinon.stub(),
            back: sinon.spy(),
        };
        options = {
            localVue,
            mocks: {
                $router,
            },
        };
    });

    afterEach(() => { sandbox.restore(); });

    it('랜딩 시 user profile이 비어있다면 profile 등록 화면으로 라우팅된다.', () => {
        // given
        gettersHelper.profile.returns(StateInitializer.kakaoProfile());

        // when
        shallowMount(RegisterInterestNestedPage, options);

        // then
        expect($router.push.withArgs(PATH.REGISTER.PROFILE).calledOnce).to.be.true;
    });

    it('랜딩 시 selecetedRegions가 비어있다면 region 등록 화면으로 라우팅된다.', () => {
        // given
        const profile = StateInitializer.kakaoProfile();
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);
        gettersHelper.selectedRegions.returns({});

        // when
        shallowMount(RegisterInterestNestedPage, options);

        // then
        expect($router.push.withArgs(PATH.REGISTER.REGION).calledOnce).to.be.true;
    });

    it('register 메서드 호출 시 회원가입을 요청하고 회원가입 요청 성공 시 메인 화면으로 라우팅 된 후 스낵바가 호출된다.', async () => {
        // given
        const profile = StateInitializer.kakaoProfile();
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);
        gettersHelper.selectedRegions.returns({ 1: { seq: 2 } });
        gettersHelper.selectedInterestSeqs.returns([1]);
        actionsHelper.postRegister.returns(Promise.resolve());
        $router.push.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(RegisterInterestNestedPage, options);
        wrapper.vm.register();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.postRegister.calledOnce).to.be.true;
        expect($router.push.withArgs(PATH.CLUB_LIST).calledOnce).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('register 메서드 호출 시 회원가입을 요청하고 회원가입 요청 실패 시 프로파일 등록화면으로 라우팅 된 후 스낵바가 호출된다.', async () => {
        // given
        const profile = StateInitializer.kakaoProfile();
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);
        gettersHelper.selectedRegions.returns({ 1: { seq: 2 } });
        gettersHelper.selectedInterestSeqs.returns([1]);
        actionsHelper.postRegister.returns(Promise.reject());
        $router.push.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(RegisterInterestNestedPage, options);
        wrapper.vm.register();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.postRegister.calledOnce).to.be.true;
        expect($router.push.withArgs(PATH.REGISTER.PROFILE).calledOnce).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });
});
