const numericReg = /^[+-]?\d+$/;

function isNumeric(value) {
    return numericReg.test(value);
}

const currencyReg = /(^[+-]?\d+)(\d{3})/;

function toCurrency(value) {
    if (isNumeric(value)) {
        let currencyValue = value.toString();
        while (currencyReg.test(currencyValue)) {
            currencyValue = currencyValue.replace(currencyReg, '$1,$2');
        }
        return currencyValue;
    }
    return value;
}

function createClubMaximumNumberList(min, max, step) {
    const maximumNumberList = [min];
    for (let maximumNumber = min; maximumNumber <= max; maximumNumber += step) {
        maximumNumberList.push(maximumNumber);
    }
    return maximumNumberList;
}

export {
    isNumeric,
    toCurrency,
    createClubMaximumNumberList,
};
