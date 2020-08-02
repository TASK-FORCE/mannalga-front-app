import axios from 'axios';
import { sleep } from '@/apis/delayUtil.js';

function requestLocationTemplate() {
    return sleep(1000).then(() => axios.get('/api/locations'));
}

export { requestLocationTemplate };
