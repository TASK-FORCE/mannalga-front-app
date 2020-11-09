import { expect } from 'chai';
import ResponseConverter from '@/apis/converter/ResponseConverter.js';

describe('ResponseConverter', () => {
    it('extractResponseData Test', () => {
        expect(ResponseConverter.extractResponseData()).undefined;
        expect(ResponseConverter.extractResponseData({})).undefined;
        expect(ResponseConverter.extractResponseData({ temp: '1' })).undefined;
        expect(ResponseConverter.extractResponseData({ data: 'test' })).eq('test');
    });

    it('extractSuperInventionResponseData Test', () => {
        expect(ResponseConverter.extractSuperInventionResponseData()).undefined;
        expect(ResponseConverter.extractSuperInventionResponseData({})).undefined;
        expect(ResponseConverter.extractSuperInventionResponseData({ temp: '1' })).undefined;
        expect(ResponseConverter.extractSuperInventionResponseData({ data: 'test' })).undefined;
        expect(ResponseConverter.extractSuperInventionResponseData(
            { data: { data: 'test' } },
        )).eq('test');
    });
});
