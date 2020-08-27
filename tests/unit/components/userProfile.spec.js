import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import UserProfile from '@/components/UserProfile.vue';
import { CHANGE_PROFILE_NAME, DEFAULT_PROFILE, PROFILE, REQUEST_PROFILE, } from '@/store/type/user_type.js';
import { LOGIN_PATH } from '@/router/route_path_type.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserProfile.Vue', () => {
    let store;
    let mutations;
    let actions;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        actions = {
            [REQUEST_PROFILE]: sinon.stub(),
        };
        mutations = {
            [CHANGE_PROFILE_NAME]: sinon.spy(),
        };
        getters = {
            [PROFILE]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                common: {
                    namespaced: true,
                    getters: { isLoading() {} },
                },
                user: {
                    namespaced: true,
                    actions,
                    mutations,
                    getters,
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

    it('페이지 진입 시 profile이 비어있다면 profile을 요청한다.', () => {
        // given
        getters.profile.returns(DEFAULT_PROFILE);

        // when
        shallowMount(UserProfile, options);

        // then
        expect(actions[REQUEST_PROFILE].called).to.be.true;
        expect($router.push.withArgs(LOGIN_PATH).notCalled).to.be.true;
    });

    it('페이지 진입 시 profile이 비어있지 않다면 profile을 요청하지 않는다.', () => {
        // given
        const newProfile = { ...DEFAULT_PROFILE };
        newProfile.name = 'Jayden';
        getters.profile.returns(newProfile);

        // when
        shallowMount(UserProfile, options);

        // then
        expect(actions[REQUEST_PROFILE].called).to.be.false;
    });

    it('profile 요청 시 예외가 발생하면 login으로 라우팅된다.', async () => {
        // given
        getters.profile.returns(DEFAULT_PROFILE);
        actions[REQUEST_PROFILE].returns(Promise.reject());

        // when
        const wrapper = shallowMount(UserProfile, options);
        await wrapper.vm.$nextTick();

        // then
        expect(actions[REQUEST_PROFILE].called).to.be.true;
        expect($router.push.withArgs(LOGIN_PATH).calledOnce).to.be.true;
    });
});
