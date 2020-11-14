import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

const { getters } = store;

class GettersHelper {
    // auth module
    hasToken = () => get(MODULE.AUTH, 'hasToken');
    appToken = () => get(MODULE.AUTH, 'appToken');

    // club module
    clubData = () => get(MODULE.CLUB, 'clubData');
    clubName = () => get(MODULE.CLUB, 'clubName');

    // clubList module
    clubList = () => get(MODULE.CLUB_LIST, 'clubList');
    clubPage = () => get(MODULE.CLUB_LIST, 'clubPage');
    myClubList = () => get(MODULE.CLUB_LIST, 'myClubList');
    myClubPage = () => get(MODULE.CLUB_LIST, 'myClubPage');
    clubSearchFilterInfo = () => get(MODULE.CLUB_LIST, 'clubSearchFilterInfo');

    // common module
    isLoading = () => get(MODULE.COMMON, 'isLoading');
    snackBarOptions = () => get(MODULE.COMMON, 'snackBarOptions');

    // template module
    rootRegions = () => get(MODULE.TEMPLATE, 'rootRegions');
    rootInterests = () => get(MODULE.TEMPLATE, 'rootInterests');

    // user module
    kakaoProfile = () => get(MODULE.USER, 'kakaoProfile');
    selectedRegions = () => get(MODULE.USER, 'selectedRegions');
    selectedInterestSeqs = () => get(MODULE.USER, 'selectedInterestSeqs');
    userProfile = () => get(MODULE.USER, 'userProfile');
}

const get = (moduleName, getterName) => getters[combineWithModuleName(moduleName, getterName)];

const gettersHelper = new GettersHelper();
export default gettersHelper;
