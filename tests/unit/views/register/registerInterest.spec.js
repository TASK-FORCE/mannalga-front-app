import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import RegisterInterest from '@/views/register/RegisterInterest.vue';
import { EMPTY_PROFILE, POST_REGISTER, PROFILE, SELECTED_INTEREST_SEQS, SELECTED_LOCATIONS } from '@/store/type/user_type.js';
import { MAIN_PATH, REGISTER } from '@/router/route_path_type.js';
import { OPEN_SNACKBAR } from '@/store/type/common_type.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterInterest.vue', () => {
    let store;
    let mutations;
    let actions;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        actions = {
            [POST_REGISTER]: sinon.stub(),
        };
        mutations = {
            [OPEN_SNACKBAR]: sinon.spy(),
        };
        getters = {
            [PROFILE]: sinon.stub(),
            [SELECTED_LOCATIONS]: sinon.stub(),
            [SELECTED_INTEREST_SEQS]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    getters,
                    actions,
                },
                common: {
                    namespaced: true,
                    mutations,
                },
            },
        });
        $router = {
            push: sinon.stub(),
            back: sinon.spy(),
        };
        options = {
            store,
            localVue,
            mocks: {
                $router,
            },
        };
    });

    it('랜딩 시 user profile이 비어있다면 profile 등록 화면으로 라우팅된다.', () => {
        // given
        getters[PROFILE].returns(EMPTY_PROFILE);

        // when
        shallowMount(RegisterInterest, options);

        // then
        expect($router.push.withArgs(REGISTER.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('랜딩 시 selecetedLocations가 비어있다면 location 등록 화면으로 라우팅된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        getters[PROFILE].returns(profile);
        getters[SELECTED_LOCATIONS].returns({});

        // when
        shallowMount(RegisterInterest, options);

        // then
        expect($router.push.withArgs(REGISTER.LOCATION_PATH).calledOnce).to.be.true;
    });

    it('register 메서드 호출 시 회원가입을 요청하고 회원가입 요청 성공 시 메인 화면으로 라우팅 된 후 스낵바가 호출된다.', async () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        getters[PROFILE].returns(profile);
        getters[SELECTED_LOCATIONS].returns({ 1: { seq: 2 } });
        getters[SELECTED_INTEREST_SEQS].returns([1]);
        actions[POST_REGISTER].returns(Promise.resolve());
        $router.push.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(RegisterInterest, options);
        wrapper.vm.register();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actions[POST_REGISTER].calledOnce).to.be.true;
        expect($router.push.withArgs(MAIN_PATH).calledOnce).to.be.true;
        expect(mutations[OPEN_SNACKBAR].calledOnce).to.be.true;
    });

    it('register 메서드 호출 시 회원가입을 요청하고 회원가입 요청 실패 시 프로파일 등록화면으로 라우팅 된 후 스낵바가 호출된다.', async () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        getters[PROFILE].returns(profile);
        getters[SELECTED_LOCATIONS].returns({ 1: { seq: 2 } });
        getters[SELECTED_INTEREST_SEQS].returns([1]);
        actions[POST_REGISTER].returns(Promise.reject());
        $router.push.returns(Promise.resolve());

        // when
        const wrapper = shallowMount(RegisterInterest, options);
        wrapper.vm.register();
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        // then
        expect(actions[POST_REGISTER].calledOnce).to.be.true;
        expect($router.push.withArgs(REGISTER.PROFILE_PATH).calledOnce).to.be.true;
        expect(mutations[OPEN_SNACKBAR].calledOnce).to.be.true;
    });
});
