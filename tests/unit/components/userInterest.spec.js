import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserInterest from '@/components/user/UserInterestSelectList.vue';
import { testUtils } from '../../utils/testUtils.js';

const sandbox = sinon.createSandbox();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserInterestSelectList.vue', () => {
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
        };
    });

    afterEach(() => { sandbox.restore(); });

    it('isInclude 메서드 호출 시 selectedInterestSeq에 존재하면 active를 반환하고 그렇지 않으면 빈 텍스트를 반환한다.', () => {
        // given
        gettersHelper.selectedInterestSeqs.returns([1]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        const active = wrapper.vm.isInclude(1);
        const empty = wrapper.vm.isInclude(3);

        // then
        expect(active).to.be.equals('active');
        expect(empty).to.be.equals('');
    });

    it('toggleInterest가 호출될 때 selectedInterestSeq에 존재한다면 해당 선택된 interest을 제거한다.', () => {
        // given
        const targetInterestSeq = 1;
        gettersHelper.selectedInterestSeqs.returns([targetInterestSeq]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        wrapper.vm.toggleInterest(targetInterestSeq);

        // then
        expect(mutationsHelper.removeSelectedInterestSeqs.calledOnce).to.be.true;
    });

    it('toggleInterest가 호출될 때 selectedInterestSeq가 이미 최대 갯수를 초과했다면 스낵바를 보여주고 최상단으로 스크롤 한다.', () => {
        // given
        gettersHelper.selectedInterestSeqs.returns([1, 2, 3, 4, 5]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        wrapper.vm.toggleInterest(10);

        // then
        expect(mutationsHelper.openSnackBar.calledOnce).to.be.true;
    });

    it('toggleInterest 호출될 때 selectedInterestSeq에 존재하지 않으면 추가한다.', () => {
        // given
        gettersHelper.selectedInterestSeqs.returns([1, 2]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        wrapper.vm.toggleInterest(3);

        // then
        expect(mutationsHelper.addSelectedInterestSeqs.calledOnce).to.be.true;
    });
});
