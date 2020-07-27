import { assert } from 'chai';

// link: https://www.chaijs.com/api/assert/#method_notnestedinclude
describe('chai 학습 테스트', () => {
    it('assert(표현식, 메시지)', () => {
        assert('foo' !== 'bar', 'foo는 bar가 아니다');
        assert(Array.isArray([]), '빈 배열은 배열이다.');
    });
    it('isOk, isNotOk (object, [message])', () => {
        assert.isOk('hello world', 'success');
        assert.isOk(1, 'success');
        assert.isOk({}, 'success');
        // assert.isOk(false, 'fail');
        // assert.isOk(undefined, 'fail');
        // assert.isOk(null, 'fail');
    });
    it('equal, notEqual(actual, expected, [message])', () => {
        assert.equal(3, '3', 'equal은 == 연산자로 비교한다.');
        assert.notEqual(3, '4', 'notEqual은 != 연산자로 비교한다.');
    });

    it('strictEqual, notStrictEqual(actual, expected, [message])', () => {
        assert.strictEqual(3, 3, 'strictEqual은 === 연산자로 비교한다.');
        assert.notStrictEqual(3, '3', 'notXStrictEqual은 !== 연산자로 비교한다.');
    });

    it('deppEqual, notDeepEqual(actual, expected, [message])', () => {
        assert.deepEqual(
            {
                a: 'a',
                b: {
                    c: 'c',
                    d: 'd',
                },
            },
            {
                a: 'a',
                b: {
                    c: 'c',
                    d: 'd',
                },
            },
        );

        assert.notDeepEqual(
            {
                a: 'a',
                b: {
                    c: 'c',
                    d: 'd',
                },
            },
            {
                a: 'a',
                b: {
                    c: 'c',
                    d: 'e',
                },
            },
        );
    });

    it('숫자 비교', () => {
        assert.isAbove(5, 2, '5는 2보다 크다(>)');

        assert.isAtLeast(5, 2, '5는 2보다 크거나 같다(<=)');
        assert.isAtLeast(5, 5, '5는 5보다 크거나 같다(<=)');

        assert.isBelow(2, 5, '2는 5보다 작다(<)');

        assert.isAtMost(2, 5, '2는 5보다 작거나 같다,(<=)');
        assert.isAtMost(2, 2, '2는 2보다 작거나 같다,(<=)');
    });

    it('true, false 검증', () => {
        assert.isTrue(true);
        assert.isNotTrue(false);
        assert.isNotTrue({});
        assert.isNotTrue([]);

        assert.isFalse(false);
        assert.isNotFalse(true);
        assert.isNotFalse([]);
        assert.isNotFalse({});
    });

    it('null, NaN, undefined 검증', () => {
        assert.isNull(null);
        assert.isNotNull(undefined);
        assert.isNotNull('1');
        assert.isNotNull({});

        assert.isNaN(NaN);
        assert.isNotNaN(null);
        assert.isNotNaN(undefined);
        assert.isNotNaN(1);

        assert.exists(1, 'null or undefined가 아니다.');
        assert.exists(NaN, 'null or undefined가 아니다.');
        assert.exists([], 'null or undefined가 아니다.');

        assert.notExists(null, 'null or undefined이다.');
        assert.notExists(undefined, 'null or undefined이다.');

        assert.isUndefined(undefined);
        assert.isDefined(null);
        assert.isDefined([]);
    });

    // it('function, array, object 검증', () => {
    //
    // });
});
