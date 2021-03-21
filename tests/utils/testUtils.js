import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import actionsHelper from '@/store/helper/ActionsHelper.ts';

function gettersMocking(sandbox) {
    const getterHelperMock = sandbox.mock(gettersHelper);
    return {};
}

function actionsMocking(sandbox) {
    const actionHelperMock = sandbox.mock(actionsHelper);
    return {};
}

function mutationsMocking(sandbox) {
    const mutationsHelperMock = sandbox.mock(mutationsHelper);
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
