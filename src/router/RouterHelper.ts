import router from '@/router/index.ts';
import { Dictionary } from 'vue-router/types/router';

class RouterHelper {
    clubSeq = () => getParams().clubSeq;
    meetingSeq = () => getParams().meetingSeq;
    boardSeq = () => getParams().boardSeq;
    albumSeq = () => getParams().albumSeq;
}

const getParams = (): Dictionary<string> => router.currentRoute.params;

const routerHelper = new RouterHelper();
export default routerHelper;
