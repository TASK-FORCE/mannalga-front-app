import { gettersHelper } from '@/store/helper/gettersHelper.js';
import { mutationsHelper } from '@/store/helper/mutationsHelper.js';
import { actionsHelper } from '@/store/helper/actionsHelper.js';
import { actionsFetcherService } from '@/store/service/actionsFetcherService.js';

function gettersMocking(sandbox) {
    const getterHelperMock = sandbox.mock(gettersHelper);
    return {
        isLoading: getterHelperMock.expects('isLoading'),
        snackBarOptions: getterHelperMock.expects('snackBarOptions'),
        isAuth: getterHelperMock.expects('isAuth'),
        appToken: getterHelperMock.expects('appToken'),
        rootLocations: getterHelperMock.expects('rootLocations'),
        rootInterests: getterHelperMock.expects('rootInterests'),
        profile: getterHelperMock.expects('profile'),
        selectedLocations: getterHelperMock.expects('selectedLocations'),
        selectedInterestSeqs: getterHelperMock.expects('selectedInterestSeqs'),
        clubList: getterHelperMock.expects('clubList'),
        clubPage: getterHelperMock.expects('clubPage'),
        searchFilter: getterHelperMock.expects('searchFilter'),
        isLastPage: getterHelperMock.expects('isLastPage'),
        isFirstPage: getterHelperMock.expects('isFirstPage'),
    };
}

function actionsMocking(sandbox) {
    const actionHelperMock = sandbox.mock(actionsHelper);
    return {
        uploadTempImage: actionHelperMock.expects('uploadTempImage'),
        requestProfile: actionHelperMock.expects('requestProfile'),
        postRegister: actionHelperMock.expects('postRegister'),
        requestRegisterStatus: actionHelperMock.expects('requestRegisterStatus'),
        requestKakaoTokenByCode: actionHelperMock.expects('requestKakaoTokenByCode'),
        requestClubCreate: actionHelperMock.expects('requestClubCreate'),
        requestFirstClubList: actionHelperMock.expects('requestFirstClubList'),
        requestNextClubList: actionHelperMock.expects('requestNextClubList'),
    };
}

function mutationsMocking(sandbox) {
    const mutationsHelperMock = sandbox.mock(mutationsHelper);
    return {
        closeSnackBar: mutationsHelperMock.expects('closeSnackBar'),
        openSnackBar: mutationsHelperMock.expects('openSnackBar'),
        changeProfileName: mutationsHelperMock.expects('changeProfileName'),
        addSelectedLocations: mutationsHelperMock.expects('addSelectedLocations'),
        addSelectedInterestSeqs: mutationsHelperMock.expects('addSelectedInterestSeqs'),
        removeSelectedInterestSeqs: mutationsHelperMock.expects('removeSelectedInterestSeqs'),
        changeLocationSearchFilter: mutationsHelperMock.expects('changeLocationSearchFilter'),
        changeInterestSearchFilter: mutationsHelperMock.expects('changeInterestSearchFilter'),
    };
}

function fetcherServiceMocking(sandbox) {
    const actionsFetcherServiceMock = sandbox.mock(actionsFetcherService);
    return {
        fetchInterestAndLocationTemplate: actionsFetcherServiceMock.expects('fetchInterestAndLocationTemplate'),
    };
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
