import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserLocation from '@/components/UserLocation.vue';
import { DEFAULT_ROOT_STATE } from '@/store/type/template_type.js';
import { testUtils } from '../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserLocation.vue', () => {
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

        gettersHelper.selectedLocations.returns([]);
    });

    afterEach(() => { sandbox.restore(); });

    it('Mount시 priority가 NaN인 경우 router.back()을 호출한다.', () => {
        // given
        options.propsData.priority = NaN;

        // when
        shallowMount(UserLocation, options);

        // then
        expect($router.back.calledOnce).to.be.true;
    });

    it('toggleLocation이 호출시 selectedLocation이 추가되고 router.back()이 호출된다.', () => {
        // given
        const location = DEFAULT_ROOT_STATE;

        // when
        const wrapper = shallowMount(UserLocation, options);
        wrapper.vm.toggleLocation(location);

        // then
        expect(mutationsHelper.addSelectedLocations.calledOnce).to.be.true;
        expect($router.back.calledOnce).to.be.true;
    });
});
