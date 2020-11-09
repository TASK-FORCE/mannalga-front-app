import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import RegisterRegionNestedPage from '@/views/register/inner/RegisterRegionNestedPage.vue';
import { PATH } from '@/router/route_path_type.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import { testUtils } from '../../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterRegionNestedPage.vue', () => {
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

    it('페이지 진입 시 Profile이 비어있다면 Profile 등록화면으로 라우팅 된다..', () => {
        // given
        gettersHelper.profile.returns(defaultBuilder.buildKakaoProfile());

        // when
        shallowMount(RegisterRegionNestedPage, options);

        // then
        expect($router.push.withArgs(PATH.REGISTER.PROFILE).calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 하나도 없다면 Snackbar를 호출한다.', () => {
        // given
        gettersHelper.selectedRegions.returns([]);

        // when
        const wrapper = shallowMount(RegisterRegionNestedPage, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 존재하면 관심사 페이지로 라우팅된다.', () => {
        // given
        gettersHelper.selectedRegions.returns([{}, {}]);

        // when
        const wrapper = shallowMount(RegisterRegionNestedPage, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(PATH.REGISTER.INTEREST).calledOnce).to.be.true;
    });
});
