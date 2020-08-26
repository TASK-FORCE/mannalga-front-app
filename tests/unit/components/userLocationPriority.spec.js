import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import sinon from 'sinon';
import { expect } from 'chai';
import { SELECTED_LOCATIONS } from '@/store/type/user_type.js';
import UserLocationPriority from '@/components/UserLocationPriority.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserLocationPriority.vue', () => {
    let store;
    let getters;
    let options;
    let $router;

    beforeEach(() => {
        getters = {
            [SELECTED_LOCATIONS]: sinon.stub(),
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

    it('prioritySize는 3이다.', () => {
        // given
        getters[SELECTED_LOCATIONS].returns([]);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);

        // then
        expect(wrapper.vm.prioritySize).to.be.equals(3);
    });

    it('priority와 매칭되는 selectedLocation이 존재하면 getColor는 green을 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        getters[SELECTED_LOCATIONS].returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const color = wrapper.vm.getColor(1);

        // then
        expect(color).to.be.equals('green');
    });

    it('priority와 매칭되는 selectedLocation이 존재하지 않으면 getColor는 black을 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        getters[SELECTED_LOCATIONS].returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const color = wrapper.vm.getColor(3);

        // then
        expect(color).to.be.equals('black');
    });

    it('priority와 매칭되는 selectedLocation이 존재하면 getText는 선택된 location의 name을 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        getters[SELECTED_LOCATIONS].returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const text = wrapper.vm.getText(1);

        // then
        expect(text).to.be.equals(selectedLocations[1].name);
    });

    it('priority와 매칭되는 selectedLocation이 존재하면 getText는 선택된 location의 name이 겹치면 잘라서 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '세종특별자치시/세종특별자치시' } };
        getters[SELECTED_LOCATIONS].returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const text = wrapper.vm.getText(1);

        // then
        expect(text).to.be.equals('세종특별자치시');
    });

    it('priority와 매칭되는 selectedLocation이 존재하지 않으면 getText는 우선순위를 반환한다.', () => {
        // given
        const selectedLocations = { 1: { name: '서울시/천호동' } };
        getters[SELECTED_LOCATIONS].returns(selectedLocations);

        // when
        const wrapper = shallowMount(UserLocationPriority, options);
        const text = wrapper.vm.getText(3);

        // then
        expect(text).to.be.equals('우선순위 3');
    });
});
