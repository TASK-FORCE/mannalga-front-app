import _ from 'lodash';

/** lodash 라이브러리 함수들을 wrapping 하는 곳
 *  - 코드 자동 완성과 추후 빌드 번들 크기를 편리하게 줄이기 위해 wrapping utils 사용
 */

function isEmpty(target) {
    return _.isEmpty(target);
}

function findIndex(array, predicate) {
    return _.findIndex(array, predicate);
}

function isEqual(value, other) {
    return _.isEqual(value, other);
}

export {
    isEmpty,
    isEqual,
    findIndex,
};
