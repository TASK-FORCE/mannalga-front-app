import router from '@/router/index.ts';
import { Dictionary } from 'vue-router/types/router';

class RouterHelper {
  clubSeq = (): number => parseInt(getParams().clubSeq, 10);
  meetingSeq = (): number => parseInt(getParams().meetingSeq, 10);
  boardSeq = (): number => parseInt(getParams().boardSeq, 10);
  albumSeq = (): number => parseInt(getParams().albumSeq, 10);
}

const getParams = (): Dictionary<string> => router.currentRoute.params;

const routerHelper = new RouterHelper();
export default routerHelper;
