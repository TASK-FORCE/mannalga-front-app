import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { UploadImageResponse } from '@/interfaces/common';

const commonApi = {
    postTempImage(formData: FormData): Promise<UploadImageResponse> {
        return axios.post('/api/common/temp/file', formData)
            .then(ResponseConverter.extractSuperInventionResponseData);
    }
}

export default commonApi;
