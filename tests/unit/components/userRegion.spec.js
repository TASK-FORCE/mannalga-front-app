import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserRegion from '@/components/user/UserRegion.vue';
import { testUtils } from '../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserRegion.vue', () => {
    let gettersHelper;
    let mutationsHelper;
    let options;
    let $router;

    beforeEach(() => {
        const mockContext = testUtils.mockingAll(sandbox);
        gettersHelper = mockContext.gettersMock;
        mutationsHelper = mockContext.mutationsMock;
        $router = {
            push: sinon.stub(),
            back: sinon.stub(),
        };
        options = {
            localVue,
            mocks: {
                $router,
            },
            propsData: {
                priority: 1,
            },
        };

        gettersHelper.selectedRegions.returns([]);
    });

    afterEach(() => { sandbox.restore(); });

    it('Mount시 priority가 NaN인 경우 router.back()을 호출한다.', () => {
        // given
        options.propsData.priority = NaN;

        // when
        shallowMount(UserRegion, options);

        // then
        expect($router.back.calledOnce).to.be.true;
    });

    it('toggleRegion이 호출시 selectedRegion이 추가되고 router.back()이 호출된다.', () => {
        // given
        const region = {
            seq: 1,
            level: 1,
            name: '',
            subRegions: [],
            superRegionRoot: '',
        };

        // when
        const wrapper = shallowMount(UserRegion, options);
        wrapper.vm.toggleRegion(region);

        // then
        expect(mutationsHelper.addSelectedRegions.calledOnce).to.be.true;
        expect($router.back.calledOnce).to.be.true;
    });
});
