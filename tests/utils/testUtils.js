import gettersHelper from '@/store/helper/GettersHelper.js';
import mutationsHelper from '@/store/helper/MutationsHelper.ts';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import regionAndInterestVuexService from '@/store/service/RegionAndInterestVuexService.js';

function gettersMocking(sandbox) {
    const getterHelperMock = sandbox.mock(gettersHelper);
    return {
        isLoading: getterHelperMock.expects('isLoading'),
        snackBarOptions: getterHelperMock.expects('snackBarOptions'),
        isAuth: getterHelperMock.expects('isAuth'),
        appToken: getterHelperMock.expects('appToken'),
        rootRegions: getterHelperMock.expects('rootRegions'),
        rootInterests: getterHelperMock.expects('rootInterests'),
        profile: getterHelperMock.expects('profile'),
        selectedRegions: getterHelperMock.expects('selectedRegions'),
        selectedInterestSeqs: getterHelperMock.expects('selectedInterestSeqs'),
        clubList: getterHelperMock.expects('clubList'),
        clubPage: getterHelperMock.expects('clubPage'),
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
        addSelectedRegions: mutationsHelperMock.expects('addSelectedRegions'),
        addSelectedInterestSeqs: mutationsHelperMock.expects('addSelectedInterestSeqs'),
        removeSelectedInterestSeqs: mutationsHelperMock.expects('removeSelectedInterestSeqs'),
    };
}

function fetcherServiceMocking(sandbox) {
    const actionsFetcherServiceMock = sandbox.mock(regionAndInterestVuexService);
    return {
        fetchInterestAndRegionTemplate: actionsFetcherServiceMock.expects('fetchInterestAndRegionTemplate'),
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
