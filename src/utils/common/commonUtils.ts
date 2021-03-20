const numericReg = /^[+-]?\d+$/;

export function isNumeric(value: any): boolean {
    return numericReg.test(value);
}

const currencyReg = /(^[+-]?\d+)(\d{3})/;

export function toCurrency(value: any): string {
    if (isNumeric(value)) {
        let currencyValue = value.toString();
        while (currencyReg.test(currencyValue)) {
            currencyValue = currencyValue.replace(currencyReg, '$1,$2');
        }
        return currencyValue;
    }
    return value;
}

export function createClubMaximumNumberList(min: number, max: number, step: number): number[] {
    const maximumNumberList = [min];
    for (let maximumNumber = min; maximumNumber <= max; maximumNumber += step) {
        maximumNumberList.push(maximumNumber);
    }
    return maximumNumberList;
}
