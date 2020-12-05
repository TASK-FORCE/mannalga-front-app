import router from '@/router/index.js';

class RouterParamHelper {
    clubSeq = () => getParams().clubSeq;
    meetingSeq = () => getParams().meetingSeq;
    boardSeq = () => getParams().boardSeq;
}

const getParams = () => router.history.current.params;

const routerParamHelper = new RouterParamHelper();

export default routerParamHelper;
