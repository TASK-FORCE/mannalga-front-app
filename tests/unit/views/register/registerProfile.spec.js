import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import { EMPTY_PROFILE, PROFILE } from '@/store/type/user_type.js';
import { OPEN_SNACKBAR } from '@/store/type/common_type.js';
import RegisterProfile from '@/views/register/RegisterProfile.vue';
import { REGISTER } from '@/router/route_path_type.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('regisetProfile.vue', () => {
    let store;
    let mutations;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        mutations = {
            [OPEN_SNACKBAR]: sinon.spy(),
        };
        getters = {
            [PROFILE]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    getters,
                    mutations,
                },
                common: {
                    namespaced: true,
                    mutations,
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

    it('Go Btn 클릭 시 profile name에 공백이 있으면 스낵바가 호출된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이 동 명';
        getters[PROFILE].returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutations[OPEN_SNACKBAR].calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 비어있으면 스낵바가 호출된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        getters[PROFILE].returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(mutations[OPEN_SNACKBAR].calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 정상이면 지역선택으로 라우팅된다..', () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이동명';
        getters[PROFILE].returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(REGISTER.LOCATION_PATH).calledOnce).to.be.true;
        expect(mutations[OPEN_SNACKBAR].calledOnce).to.be.false;
    });
});
