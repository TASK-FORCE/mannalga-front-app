import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import RegisterProfileNestedPage from '@/views/register/inner/RegisterProfileNestedPage.vue';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import { PATH } from '@/router/route_path_type.js';
import { testUtils } from '../../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('regisetProfile.vue', () => {
    let gettersHelper;
    let mutationsHelper;
    let options;
    let $router;

    beforeEach(() => {
        const mockContext = testUtils.mockingAll(sandbox);
        gettersHelper = mockContext.gettersMock;
        mutationsHelper = mockContext.mutationsMock;
        $router = {
            push: sinon.spy(),
        };
        options = {
            localVue,
            mocks: {
                $router,
            },
        };
    });

    afterEach(() => { sandbox.restore(); });

    it('Go Btn 클릭 시 profile name에 공백이 있으면 스낵바가 호출된다.', () => {
        // given
        const profile = defaultBuilder.buildKakaoProfile();
        profile.name = '이 동 명';
        gettersHelper.profile.returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfileNestedPage, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 비어있으면 스낵바가 호출된다.', () => {
        // given
        const profile = defaultBuilder.buildKakaoProfile();
        gettersHelper.profile.returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfileNestedPage, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 정상이면 지역선택으로 라우팅된다..', () => {
        // given
        const profile = defaultBuilder.buildKakaoProfile();
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfileNestedPage, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(PATH.REGISTER.REGION).calledOnce).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.false;
    });
});
