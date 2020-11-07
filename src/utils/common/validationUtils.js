import _ from '@/utils/common/lodashWrapper.js';

function ruleValidationSuccess(target, rules) {
    if (rules instanceof Array) {
        return _.isEmpty(getValidationFailTexts(target, rules));
    }
    return false;
}

function getValidationFailText(target, rules) {
    if (rules instanceof Array) {
        const validationFailTexts = getValidationFailTexts(target, rules);
        return _.isEmpty(validationFailTexts) ? '' : validationFailTexts[0];
    }
    return '검증에 실패했습니다.';
}

const getValidationFailTexts = (target, rules) => rules
    .map(rule => rule(target))
    .filter(rule => typeof rule === 'string');

export {
    ruleValidationSuccess,
    getValidationFailText,
};
