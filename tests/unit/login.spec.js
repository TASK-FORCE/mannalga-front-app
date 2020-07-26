import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
    it('Login 컴포넌트 렌더링 확인', () => {
        const wrapper = shallowMount(Login, {});
        expect(wrapper.text())
            .include('Hello Login');
    });
});
