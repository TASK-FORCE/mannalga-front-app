import { isEmpty } from '@/utils/commonUtils.js';

function ruleValidationSuccess(target, rules) {
    if (!!target && rules instanceof Array) {
        return isEmpty(getValidationFailTexts(target, rules));
    }
    return false;
}

function getValidationFailText(target, rules) {
    if (!!target && rules instanceof Array) {
        const validationFailTexts = getValidationFailTexts(target, rules);
        return isEmpty(validationFailTexts) ? '' : validationFailTexts[0];
    }
    return '';
}

const getValidationFailTexts = (target, rules) => rules
    .map(rule => rule(target))
    .filter(rule => typeof rule === 'string');

export {
    ruleValidationSuccess,
    getValidationFailText,
};
