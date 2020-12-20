import router from '@/router/index.js';

class RouterHelper {
    clubSeq = () => getParams().clubSeq;
    meetingSeq = () => getParams().meetingSeq;
    boardSeq = () => getParams().boardSeq;
}

const getParams = () => router.history.current.params;

const routerHelper = new RouterHelper();

export default routerHelper;
