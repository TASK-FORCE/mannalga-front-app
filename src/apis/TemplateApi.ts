import axios from 'axios';
import ResponseConverter from '@/apis/converter/ResponseConverter.ts';
import { InterestGroupTree, RegionTree } from '@/interfaces/common';

const templateApi = {
    getRegionTemplate(): Promise<RegionTree[]> {
        return axios.get('/api/regions')
            .then(ResponseConverter.extractSuperInventionResponseData);
    },

    getInterestTemplate(): Promise<InterestGroupTree[]> {
        return axios.get('/api/interestGroup/all')
            .then(ResponseConverter.extractSuperInventionResponseData);
    },
};

export default templateApi;
