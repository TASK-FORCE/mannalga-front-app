import _ from 'lodash';

/** 기본적으로는 lodash 라이브러리 함수들을 forwarding 한다.
 *  - 코드 자동 완성과 추후 빌드 번들 크기를 편리하게 줄이기 위해 wrapping utils 사용
 *  - 필요에 따라 추가적인 유틸리티 메서드를 작성한다.
 */
const isDeepEmpty = (target) => {
    if (typeof target === 'object') {
        for (const value of Object.values(target)) {
            if (!isDeepEmpty(value)) {
                return false;
            }
        }
        return true;
    }
    return _.isEmpty(target);
};

const isEmpty = (target) => _.isEmpty(target);

const isNotEmpty = (target) => !isEmpty(target);

const findIndex = (array, predicate) => _.findIndex(array, predicate);

const isEqual = (value, other) => _.isEqual(value, other);

export default {
    isEmpty,
    isEqual,
    findIndex,
    isNotEmpty,
    isDeepEmpty,
};
