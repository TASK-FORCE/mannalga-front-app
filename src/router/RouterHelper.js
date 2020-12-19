import router from '@/router/index.js';
import goTo from 'vuetify/es5/services/goto';

class RouterHelper {
    clubSeq = () => getParams().clubSeq;
    meetingSeq = () => getParams().meetingSeq;
    boardSeq = () => getParams().boardSeq;

    moveToLastViewedPosition = () => {
        const { rememberPositionY } = router.history.current.query;
        if (rememberPositionY) {
            goTo(rememberPositionY);
        }
    };
}

const getParams = () => router.history.current.params;

const routerHelper = new RouterHelper();

export default routerHelper;
