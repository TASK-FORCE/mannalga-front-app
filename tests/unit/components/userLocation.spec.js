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
            propsData: {
                priority: 1,
            },
        };
        userGetters[SELECTED_LOCATIONS].returns([]);
    });

    it('랜딩 시 지역 정보가 존재하지 않으면 지역 정보를 요청한다.', () => {
        // given
        templateGetters[ROOT_STATES].returns([]);

        // when
        shallowMount(UserLocation, options);

        // then
        expect(templateActions[REQUEST_STATE_TEMPLATE].calledOnce).to.be.true;
    });

    it('Mount시 priority가 NaN인 경우 router.back()을 호출한다.', () => {
        // given
        options.propsData.priority = NaN;

        // when
        shallowMount(UserLocation, options);

        // then
        expect($router.back.calledOnce).to.be.true;
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

    it('toggleLocation이 호출시 selectedLocation이 추가되고 router.back()이 호출된다.', () => {
        // given
        const location = DEFAULT_ROOT_STATE;

        // when
        const wrapper = shallowMount(UserLocation, options);
        wrapper.vm.toggleLocation(location);

        // then
        expect(userMutations[ADD_SELECTED_LOCATIONS].calledOnce).to.be.true;
        expect($router.back.calledOnce).to.be.true;
    });
});
