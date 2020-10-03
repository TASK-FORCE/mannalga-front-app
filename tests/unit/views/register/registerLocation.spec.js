import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import { DEFAULT_PROFILE } from '@/store/type/user_type.js';
import RegisterLocation from '@/views/register/RegisterLocation.vue';
import { testUtils } from '../../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterLocation.vue', () => {
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
        gettersHelper.profile.returns(DEFAULT_PROFILE);

        // when
        shallowMount(RegisterLocation, options);

        // then
        expect($router.push.withArgs(REGISTER_PATH.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 하나도 없다면 Snackbar를 호출한다.', () => {
        // given
        gettersHelper.selectedLocations.returns([]);

        // when
        const wrapper = shallowMount(RegisterLocation, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 존재하면 관심사 페이지로 라우팅된다.', () => {
        // given
        gettersHelper.selectedLocations.returns([{}, {}]);

        // when
        const wrapper = shallowMount(RegisterLocation, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(REGISTER_PATH.INTEREST_PATH).calledOnce).to.be.true;
    });
});
