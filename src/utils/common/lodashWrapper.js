import { chunk, cloneDeep, debounce, findIndex, isEmpty, isEqual, isFunction, isNumber, sortBy, throttle } from 'lodash';

/** 기본적으로는 lodash 라이브러리 함수들을 forwarding 한다.
 *  - 코드 자동 완성과 추후 빌드 번들 크기를 편리하게 줄이기 위해 wrapping utils 사용
 *  - 필요에 따라 추가적인 유틸리티 메서드를 작성한다.
 */

const _ = {
    isDeepEmpty: (target) => {
        if (typeof target === 'object') {
            for (const value of Object.values(target)) {
                if (!this.isDeepEmpty(value)) {
                    return false;
                }
            }
            return true;
        }
        return isEmpty(target);
    },
    isEmpty: (target) => isEmpty(target),
    isNotEmpty: (target) => !isEmpty(target),
    findIndex: (array, predicate) => findIndex(array, predicate),
    isEqual: (value, other) => isEqual(value, other),
    isNumber: (value) => isNumber(value),
    cloneDeep: (value) => cloneDeep(value),
    isFunction: (value) => isFunction(value),
    throttle: (callback, wait) => throttle(callback, wait),
    sortBy: (list, sortTargetFunction) => sortBy(list, sortTargetFunction),
    debounce: (callback, wait, options) => debounce(callback, wait, options),
    chunk: (array, size) => chunk(array, size),
};

export default _;
