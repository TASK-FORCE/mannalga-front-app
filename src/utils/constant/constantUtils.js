function createClubMaximumNumberList(min, max, step) {
    const maximumNumberList = [min];
    for (let maximumNumber = min; maximumNumber <= max; maximumNumber += step) {
        maximumNumberList.push(maximumNumber);
    }
    return maximumNumberList;
}

export { createClubMaximumNumberList };
