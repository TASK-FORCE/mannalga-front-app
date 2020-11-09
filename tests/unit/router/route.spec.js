import { expect } from 'chai';
import { generateParamPath, PATH } from '@/router/route_path_type.js';

describe('test', () => {
    it('combineParamPath', () => {
        expect(generateParamPath(PATH.CLUB.MAIN, [123])).to.be.eq('/club/123');
        expect(generateParamPath(PATH.CLUB.BOARD_POST, [123, 456])).to.be.eq('/club/123/board/456');
    });
});
