import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class ActionsHelper {
    // meeting module
    requestMeetingCreate = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeetingCreate', payload);
    requestMeetingEdit = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeetingEdit', payload);
    requestFirstMeetingGroupList = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestFirstMeetingGroupList', payload);
    requestNextMeetingGroupList = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestNextMeetingGroupList', payload);
    requestMeeting = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeeting', payload);
    requestMeetingApplication = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeetingApplication', payload);
    requestCancelMeetingApplication = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestCancelMeetingApplication', payload);

    // template module
    requestRegionTemplate = (payload): Promise<any> => dispatch(MODULE.TEMPLATE, 'requestRegionTemplate', payload);
    requestInterestTemplate = (payload): Promise<any> => dispatch(MODULE.TEMPLATE, 'requestInterestTemplate', payload);
}

const dispatch = (moduleName, actionsName, payload) => store.dispatch(combineWithModuleName(moduleName, actionsName), payload);

const actionsHelper = new ActionsHelper();
export default actionsHelper;
