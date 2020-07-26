import { assert } from 'chai';
import stubUtils from '../../../stub/stubUtils.js';

const NOT_STUB_REQUESTS = [
    {
        path: '/undefined/method',
    },
    {
        path: '/empty/method/list',
        methods: [],
    },
    {
        path: '/get/post',
        methods: ['get', 'post'],
    },
];

describe('stubUtils.isStubRequest', () => {
    const validate = (path, method, answer) => {
        const result = stubUtils.isStubRequest({ path, method }, NOT_STUB_REQUESTS);
        assert.strictEqual(result, answer);
    };

    it('path와 매칭되는 NOT_STUB_REQUESTS의 methods가 undefined인 경우 모든 메서드는 STUB 대상이 아니다.', () => {
        const path = '/undefined/method';
        validate(path, 'GET', false);
        validate(path, 'POST', false);
        validate(path, 'PUT', false);
        validate(path, 'DELETE', false);
    });

    it('path와 매칭되는 NOT_STUB_REQUESTS의 methods가 비어있으면 모든 메서드는 STUB 대상이 아니다.', () => {
        const path = '/empty/method/list';
        validate(path, 'GET', false);
        validate(path, 'POST', false);
        validate(path, 'PUT', false);
        validate(path, 'DELETE', false);
    });

    it('path, method가 NOT_STUB_REQUESTS에 매칭되면 STUB 대상이 아니다.', () => {
        const path = '/get/post';
        validate(path, 'GET', false);
        validate(path, 'POST', false);
        validate(path, 'PUT', true);
        validate(path, 'DELETE', true);
    });

    it('path와 매칭되는 NOT_STUB_REQUESTS가 없다면 Stub 대상이다.', () => {
        const path = '/notInclude';
        validate(path, 'GET', true);
        validate(path, 'POST', true);
        validate(path, 'PUT', true);
        validate(path, 'DELETE', true);
    });
});
