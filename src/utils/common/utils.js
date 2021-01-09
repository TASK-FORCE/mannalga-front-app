const numericReg = /^[+-]?\d+$/;
const isNumeric = (value) => numericReg.test(value);

const currencyReg = /(^[+-]?\d+)(\d{3})/;
const toCurrency = (value) => {
    if (isNumeric(value)) {
        let currencyValue = value.toString();
        while (currencyReg.test(currencyValue)) {
            currencyValue = currencyValue.replace(currencyReg, '$1,$2');
        }
        return currencyValue;
    }
    return value;
};

export { isNumeric, toCurrency };
