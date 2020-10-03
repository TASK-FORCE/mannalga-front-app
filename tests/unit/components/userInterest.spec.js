import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserInterest from '@/components/UserInterest.vue';
import { ROOT_INTERESTS } from '@/store/type/template_type.js';
import { ADD_SELECTED_INTEREST_SEQS, REMOVE_SELECTED_INTEREST_SEQS, SELECTED_INTEREST_SEQS } from '@/store/type/user_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserInterest.vue', () => {
    let openSnackBar;
    let templateGetters;
    let userGetters;
    let templateActions;
    let userMutations;
    let store;
    let options;
    let $router;
    beforeEach(() => {
        openSnackBar = sinon.stub(mutationsHelper, 'openSnackBar');
        templateGetters = {
            [ROOT_INTERESTS]: sinon.stub(),
        };
        userGetters = {
            [SELECTED_INTEREST_SEQS]: sinon.stub(),
        };
        userMutations = {
            [ADD_SELECTED_INTEREST_SEQS]: sinon.stub(),
            [REMOVE_SELECTED_INTEREST_SEQS]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                template: {
                    namespaced: true,
                    getters: templateGetters,
                    actions: templateActions,
                },
                user: {
                    namespaced: true,
                    getters: userGetters,
                    mutations: userMutations,
                },
            },
        });
        $router = {
            push: sinon.stub(),
            back: sinon.stub(),
        };
        options = {
            store,
            localVue,
            mocks: {
                $router,
            },
        };
    });

    afterEach(() => { openSnackBar.restore(); });

    it('isInclude 메서드 호출 시 selectedInterestSeq에 존재하면 active를 반환하고 그렇지 않으면 빈 텍스트를 반환한다.', () => {
        // given
        userGetters[SELECTED_INTEREST_SEQS].returns([1]);

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
        const targetLocationSeq = 1;
        userGetters[SELECTED_INTEREST_SEQS].returns([targetLocationSeq]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        wrapper.vm.toggleInterest(targetLocationSeq);

        // then
        expect(userMutations[REMOVE_SELECTED_INTEREST_SEQS].calledOnce).to.be.true;
    });

    it('toggleInterest가 호출될 때 selectedInterestSeq가 이미 최대 갯수를 초과했다면 스낵바를 보여주고 최상단으로 스크롤 한다.', () => {
        // given
        userGetters[SELECTED_INTEREST_SEQS].returns([1, 2, 3, 4, 5]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        wrapper.vm.toggleInterest(10);

        // then
        expect(openSnackBar.calledOnce).to.be.true;
    });

    it('toggleInterest 호출될 때 selectedInterestSeq에 존재하지 않으면 추가한다.', () => {
        // given
        userGetters[SELECTED_INTEREST_SEQS].returns([1, 2]);

        // when
        const wrapper = shallowMount(UserInterest, options);
        wrapper.vm.toggleInterest(3);

        // then
        expect(userMutations[ADD_SELECTED_INTEREST_SEQS].calledOnce).to.be.true;
    });
});
