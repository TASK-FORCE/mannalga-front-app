function gettersMocking(sandbox) {
    return {};
}

function actionsMocking(sandbox) {
    return {};
}

function mutationsMocking(sandbox) {
    return {};
}

function fetcherServiceMocking(sandbox) {
    return {};
}

function mockingAll(sandbox) {
    return {
        gettersMock: gettersMocking(sandbox),
        mutationsMock: mutationsMocking(sandbox),
        actionsMock: actionsMocking(sandbox),
        fetcherServiceMock: fetcherServiceMocking(sandbox),
    };
}

const testUtils = {
    mockingAll,
};

export { testUtils };
