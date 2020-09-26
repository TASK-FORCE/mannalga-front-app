import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import { EMPTY_PROFILE, PROFILE } from '@/store/type/user_type.js';
import RegisterProfile from '@/views/register/RegisterProfile.vue';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import * as vuexHelper from '@/store/helper/actionsHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('regisetProfile.vue', () => {
    let openSnackBar;
    let store;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        openSnackBar = sinon.stub(mutationsHelper, 'openSnackBar');
        getters = {
            [PROFILE]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
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

    afterEach(() => { openSnackBar.restore(); });

    it('Go Btn 클릭 시 profile name에 공백이 있으면 스낵바가 호출된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        profile.name = '이 동 명';
        getters[PROFILE].returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 profile name이 비어있으면 스낵바가 호출된다.', () => {
        // given
        const profile = EMPTY_PROFILE;
        getters[PROFILE].returns(profile);

        // when
        const wrapper = shallowMount(RegisterProfile, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(openSnackBar.calledOnce).to.be.true;
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
        expect($router.push.withArgs(REGISTER_PATH.LOCATION_PATH).calledOnce).to.be.true;
        expect(openSnackBar.calledOnce).to.be.false;
    });
});
