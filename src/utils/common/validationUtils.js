import _ from '@/utils/common/lodashWrapper.js';
import store from '@/store/index.ts';
import { MutationTypes } from '@/store/type/methodTypes.ts';

function validateWithRules(target, rules) {
    const validationMessages = getValidationMessage(target, rules);
    if (_.isEmpty(validationMessages)) {
        return true;
    }
    store.commit(MutationTypes.OPEN_SNACK_BAR, validationMessages[0]);
    return false;
}

function getValidationMessage(target, rules) {
    return rules
        .map(rule => {
            const value = rule(target);
            if (typeof value === 'string') {
                return value;
            }
            if (typeof value === 'boolean') {
                return value ? '' : '잘못된 값입니다.';
            }
            console.warn('invalid rule function result. value: ', value);
            return '';
        })
        .filter(value => !_.isEmpty(value));
}

export {
    validateWithRules,
};
