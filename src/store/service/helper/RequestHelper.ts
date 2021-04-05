import store from '@/store/index.ts';
import { UIMutationTypes } from '@/store/type/mutationTypes.ts';

class RequestHelper {
  static async dispatchAll(
    withLoading: boolean,
    promiseList: Promise<any>[]
  ) {
    try {
      if (withLoading) {
        store.commit(UIMutationTypes.CHANGE_LOADING, true);
      }
      await Promise.all(promiseList);
    } finally {
      if (withLoading) {
        store.commit(UIMutationTypes.CHANGE_LOADING, false);
      }
    }
  }
}

export default RequestHelper;
