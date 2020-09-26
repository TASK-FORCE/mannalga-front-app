import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { REGISTER_PATH } from '@/router/route_path_type.js';
import { DEFAULT_PROFILE, PROFILE, SELECTED_LOCATIONS } from '@/store/type/user_type.js';
import RegisterLocation from '@/views/register/RegisterLocation.vue';
import { ROOT_LOCATIONS } from '@/store/type/template_type.js';
import * as vuexHelper from '@/store/helper/actionsHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('RegisterLocation.vue', () => {
    let openSnackBar;
    let store;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        openSnackBar = sinon.stub(mutationsHelper, 'openSnackBar');
        getters = {
            [PROFILE]: sinon.stub(),
            [SELECTED_LOCATIONS]: sinon.stub(),
        };
        store = new Vuex.Store({
            modules: {
                user: {
                    namespaced: true,
                    getters,
                },
                template: {
                    namespaced: true,
                    getters: {
                        [ROOT_LOCATIONS]: sinon.spy(),
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

    afterEach(() => { openSnackBar.restore(); });

    it('페이지 진입 시 Profile이 비어있다면 Profile 등록화면으로 라우팅 된다..', () => {
        // given
        getters[PROFILE].returns(DEFAULT_PROFILE);

        // when
        shallowMount(RegisterLocation, options);

        // then
        expect($router.push.withArgs(REGISTER_PATH.PROFILE_PATH).calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 하나도 없다면 Snackbar를 호출한다.', () => {
        // given
        getters[SELECTED_LOCATIONS].returns([]);

        // when
        const wrapper = shallowMount(RegisterLocation, options);
        wrapper.vm.clickGoBtn();

        // then
        expect(openSnackBar.calledOnce).to.be.true;
    });

    it('Go Btn 클릭 시 선택된 지역이 존재하면 관심사 페이지로 라우팅된다.', () => {
        // given
        getters[SELECTED_LOCATIONS].returns([{}, {}]);

        // when
        const wrapper = shallowMount(RegisterLocation, options);
        wrapper.vm.clickGoBtn();

        // then
        expect($router.push.withArgs(REGISTER_PATH.INTEREST_PATH).calledOnce).to.be.true;
    });
});
