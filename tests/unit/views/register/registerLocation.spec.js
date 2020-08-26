import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { OPEN_SNACKBAR } from '@/store/type/common_type.js';
import { REGISTER } from '@/router/route_path_type.js';
import { DEFAULT_PROFILE, PROFILE, SELECTED_LOCATIONS } from '@/store/type/user_type.js';
import RegisterLocation from '@/views/register/RegisterLocation.vue';
import { REQUEST_STATE_TEMPLATE, ROOT_STATES } from '@/store/type/template_type.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterLocation.vue', () => {
    let store;
    let mutations;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        getters = {
            [PROFILE]: sinon.stub(),
            [SELECTED_LOCATIONS]: sinon.stub(),
        };
        mutations = {
            [OPEN_SNACKBAR]: sinon.spy(),
        };
        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    getters,
                },
                common: {
                    namespaced: true,
                    mutations,
                },
                template: {
                    namespaced: true,
                    getters: {
                        [ROOT_STATES]: sinon.spy(),
                    },
                    actions: {
                        [REQUEST_STATE_TEMPLATE]: sinon.spy(),
                    },
                },
            },
        });
        $router = {
            push: sinon.spy(),
        };
        options = {
            store,
            localVue,
            mocks: {
                $router,
            },
        };
    });

    it('페이지 진입 시 Profile이 비어있다면 Profile 등록화면으로 라우팅 된다..', () => {
        // given
        getters[PROFILE].returns(DEFAULT_PROFILE);

        // when
        shallowMount(RegisterLocation, options);

        // then
        expect($router.push.withArgs(REGISTER.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 하나도 없다면 Snackbar를 호출한다.', () => {
        // given
        getters[SELECTED_LOCATIONS].returns([]);

        // when
        const wrapper = shallowMount(RegisterLocation, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutations[OPEN_SNACKBAR].calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 존재하면 관심사 페이지로 라우팅된다.', () => {
        // given
        getters[SELECTED_LOCATIONS].returns([{}, {}]);

        // when
        const wrapper = shallowMount(RegisterLocation, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(REGISTER.INTEREST_PATH).calledOnce).to.be.true;
    });
});
