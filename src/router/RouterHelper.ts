import router from '@/router/index.ts';

class RouterHelper {
    clubSeq = () => getParams().clubSeq;
    meetingSeq = () => getParams().meetingSeq;
    boardSeq = () => getParams().boardSeq;
    albumSeq = () => getParams().albumSeq;
}

const getParams = () => {
    console.log(router.currentRoute);
    return router.currentRoute.params;
}

const routerHelper = new RouterHelper();
export default routerHelper;
