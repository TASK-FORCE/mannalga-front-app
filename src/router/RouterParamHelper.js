import router from '@/router/index.js';

class RouterParamHelper {
    clubSeq = () => getParams().clubSeq;
}

const getParams = () => router.history.current.params;

const routerParamHelper = new RouterParamHelper();

export default routerParamHelper;
