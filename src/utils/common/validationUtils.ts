import _ from '@/utils/common/lodashWrapper.ts';
import store from '@/store/index.ts';
import { CommonMutationTypes } from '@/store/type/mutationTypes.ts';

export function validateWithRules(target: any, rules: any[]): boolean {
    const validationMessages = getValidationMessage(target, rules);
    if (_.isEmpty(validationMessages)) {
        return true;
    }
    store.commit(CommonMutationTypes.OPEN_SNACK_BAR, validationMessages[0]);
    return false;
}

function getValidationMessage(target: any, rules: any[]) {
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
