import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import RegisterInterest from '@/views/register/RegisterInterest.vue';
import { EMPTY_PROFILE, POST_REGISTER, PROFILE, SELECTED_INTEREST_SEQS, SELECTED_REGIONS } from '@/store/type/user_type.js';
import { MAIN_PATH, REGISTER_PATH } from '@/router/route_path_type.js';
import { testUtils } from '../../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterInterest.vue', () => {
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
        gettersHelper.profile.returns(EMPTY_PROFILE);

        // when
        shallowMount(RegisterInterest, options);

        // then
        expect($router.push.withArgs(REGISTER_PATH.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('랜딩 시 selecetedRegions가 비어있다면 region 등록 화면으로 라우팅된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);
        gettersHelper.selectedRegions.returns({});

        // when
        shallowMount(RegisterInterest, options);

        // then
        expect($router.push.withArgs(REGISTER_PATH.REGION_PATH).calledOnce).to.be.true;
    });

    it('register 메서드 호출 시 회원가입을 요청하고 회원가입 요청 성공 시 메인 화면으로 라우팅 된 후 스낵바가 호출된다.', async () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);
        gettersHelper.selectedRegions.returns({ 1: { seq: 2 } });
        gettersHelper.selectedInterestSeqs.returns([1]);
        actionsHelper.postRegister.returns(Promise.resolve());
        $router.push.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(RegisterInterest, options);
        wrapper.vm.register();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.postRegister.calledOnce).to.be.true;
        expect($router.push.withArgs(MAIN_PATH).calledOnce).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('register 메서드 호출 시 회원가입을 요청하고 회원가입 요청 실패 시 프로파일 등록화면으로 라우팅 된 후 스낵바가 호출된다.', async () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);
        gettersHelper.selectedRegions.returns({ 1: { seq: 2 } });
        gettersHelper.selectedInterestSeqs.returns([1]);
        actionsHelper.postRegister.returns(Promise.reject());
        $router.push.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(RegisterInterest, options);
        wrapper.vm.register();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actionsHelper.postRegister.calledOnce).to.be.true;
        expect($router.push.withArgs(REGISTER_PATH.PROFILE_PATH).calledOnce).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });
});
