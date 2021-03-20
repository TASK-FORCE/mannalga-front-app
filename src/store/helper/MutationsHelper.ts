import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class MutationsHelper {
    // meeting
    setMeeting = (payload?) => commit(MODULE.MEETING, 'setMeeting', payload);
}

// @ts-ignore
const commit = (moduleName, commitName, payload) => store.commit(combineWithModuleName(moduleName, commitName), payload);

const mutationsHelper = new MutationsHelper();
export default mutationsHelper;
