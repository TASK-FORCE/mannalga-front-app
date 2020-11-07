import { expect } from 'chai';
import { combineParamPath, PATH } from '@/router/route_path_type.js';

describe('test', () => {
    it('combineParamPath', () => {
        expect(combineParamPath(PATH.CLUB.MAIN, [123])).to.be.eq('/club/123');
        expect(combineParamPath(PATH.CLUB.BOARD_POST, [123, 456])).to.be.eq('/club/123/board/456');
    });
});
