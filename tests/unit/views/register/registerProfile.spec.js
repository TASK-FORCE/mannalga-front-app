import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import { EMPTY_PROFILE } from '@/store/type/user_type.js';
import RegisterProfile from '@/views/register/RegisterProfile.vue';
import { REGISTER_PATH } from '@/router/route_path_type.js';
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
        const profile = EMPTY_PROFILE;
        profile.name = '이 동 명';
        gettersHelper.profile.returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 비어있으면 스낵바가 호출된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        gettersHelper.profile.returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 정상이면 지역선택으로 라우팅된다..', () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        gettersHelper.profile.returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(REGISTER_PATH.REGION_PATH).calledOnce).to.be.true;
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.false;
    });
});
