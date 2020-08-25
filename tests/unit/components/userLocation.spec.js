import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserLocation from '@/components/UserLocation.vue';
import { DEFAULT_ROOT_STATE, REQUEST_STATE_TEMPLATE, ROOT_STATES } from '@/store/type/template_type.js';
import { IS_LOADING, OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { ADD_SELECTED_LOCATIONS, SELECTED_LOCATIONS } from '@/store/type/user_type.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserLocation.vue', () => {
    let store;
    let templateGetters;
    let templateActions;
    let commonMutations;
    let userGetters;
    let userMutations;
    let options;
    let $router;

    beforeEach(() => {
        userGetters = {
            [SELECTED_LOCATIONS]: sinon.stub(),
        };
        userMutations = {
            [ADD_SELECTED_LOCATIONS]: sinon.spy(),
        };
        templateGetters = {
            [ROOT_STATES]: sinon.stub(),
        };
        templateActions = {
            [REQUEST_STATE_TEMPLATE]: sinon.stub(),
        };
        commonMutations = {
            [OPEN_SNACKBAR]: sinon.spy(),
        };
        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    getters: userGetters,
                    mutations: userMutations,
                },
                template: {
                    namespaced: true,
                    getters: templateGetters,
                    actions: templateActions,
                },
                common: {
                    namespaced: true,
                    mutations: commonMutations,
                    getters: { [IS_LOADING]: sinon.spy() },
                },
            },
        });
        $router = {
            push: sinon.spy(),
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

    it('랜딩 시 지역 정보가 존재하지 않으면 지역 정보를 요청한다.', () => {
        // given
        templateGetters[ROOT_STATES].returns([]);

        // when
        shallowMount(UserLocation, options);

        // then
        expect(templateActions[REQUEST_STATE_TEMPLATE].calledOnce).to.be.true;
    });

    it('랜딩 시 지역 정보가 존재하지 않아 지역 정보를 요청했을 때 에러가 발생하면 이전 페이지로 라우팅 된 후 스낵바가 나타난다.', async () => {
        // given
        templateGetters[ROOT_STATES].returns([]);
        templateActions[REQUEST_STATE_TEMPLATE].returns(Promise.reject());
        $router.back.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(UserLocation, options);
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(templateActions[REQUEST_STATE_TEMPLATE].calledOnce).to.be.true;
        expect($router.back.calledOnce).to.be.true;
        expect(commonMutations[OPEN_SNACKBAR].calledOnce).to.be.true;
    });

    it('toggleLocation이 호출될 때 SelectedLocationSeq에 존재한다면 해당 Location을 제거한다.', () => {
        // given
        const targetLocationSeq = 1;
        templateGetters[ROOT_STATES].returns([DEFAULT_ROOT_STATE]);
        userGetters[SELECTED_LOCATIONS].returns([targetLocationSeq]);

        // when
        const wrapper = shallowMount(UserLocation, options);
        wrapper.vm.toggleLocation(targetLocationSeq);

        // then
        expect(false).to.be.true;
    });

    it('toggleLocation이 호출될 때 SelectedLocationSeq가 이미 최대 갯수를 초과했다면 스낵바를 보여주고 최상단으로 스크롤 한다.', () => {
        // given
        global.window = {
            scrollTo: sinon.spy(),
        };
        templateGetters[ROOT_STATES].returns([DEFAULT_ROOT_STATE]);
        userGetters[SELECTED_LOCATIONS].returns([1, 2, 3]);

        // when
        const wrapper = shallowMount(UserLocation, options);
        wrapper.vm.toggleLocation(4);

        // then
        expect(commonMutations[OPEN_SNACKBAR].calledOnce).to.be.true;
        expect(window.scrollTo.calledOnce).to.be.true;
    });

    it('toggleLocation이 호출될 때 SelectedLocationSeq에 존재하지 않으면 추가한다.', () => {
        // given
        templateGetters[ROOT_STATES].returns([DEFAULT_ROOT_STATE]);
        userGetters[SELECTED_LOCATIONS].returns([1, 2]);

        // when
        const wrapper = shallowMount(UserLocation, options);
        wrapper.vm.toggleLocation(4);

        // then
        expect(userMutations[ADD_SELECTED_LOCATIONS].calledOnce).to.be.true;
    });
});
