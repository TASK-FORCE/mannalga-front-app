import axios from 'axios';
import { sleep } from '@/apis/delayUtil.js';

function requestProfile() {
    return sleep(500).then(() => axios.get('/api/profile'));
}

export {
    requestProfile,
};
