import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import UserLocation from '@/components/UserLocation.vue';
import { DEFAULT_ROOT_STATE, ROOT_LOCATIONS } from '@/store/type/template_type.js';
import { ADD_SELECTED_LOCATIONS, SELECTED_LOCATIONS } from '@/store/type/user_type.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserLocation.vue', () => {
    let openSnackBar;
    let store;
    let templateGetters;
    let templateActions;
    let userGetters;
    let userMutations;
    let options;
    let $router;

    beforeEach(() => {
        openSnackBar = sinon.stub(mutationsHelper, 'openSnackBar');
        userGetters = {
            [SELECTED_LOCATIONS]: sinon.stub(),
        };
        userMutations = {
            [ADD_SELECTED_LOCATIONS]: sinon.spy(),
        };
        templateGetters = {
            [ROOT_LOCATIONS]: sinon.stub(),
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
            propsData: {
                priority: 1,
            },
        };
        userGetters[SELECTED_LOCATIONS].returns([]);
    });

    afterEach(() => { openSnackBar.restore(); });

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
        expect(userMutations[ADD_SELECTED_LOCATIONS].calledOnce).to.be.true;
        expect($router.back.calledOnce).to.be.true;
    });
});
