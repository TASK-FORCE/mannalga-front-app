import { expect } from 'chai';
import _ from '@/utils/common/lodashWrapper.ts';

describe('lodash 기능 테스트', () => {
    it('Object IsDeepEmpty True', () => {
        // given
        const obj = {
            name: '',
            img: '',
            arr: [],
            arr2: [1, 2], // number도 Empty로 취급한다.
        };

        // when
        const result = _.isDeepEmpty(obj);

        // then
        expect(result).to.be.true;
    });

    it('Object IsDeepEmpty False', () => {
        // given
        const obj1 = {
            name: '',
            img: '',
            arr: [],
            arr2: ['hello', undefined],
        };
        const obj2 = {
            name: '',
            img: '2',
            arr: [],
            arr2: [undefined, undefined],
        };

        // when
        const result1 = _.isDeepEmpty(obj1);
        const result2 = _.isDeepEmpty(obj2);

        // then
        expect(result1).to.be.false;
        expect(result2).to.be.false;
    });

    it('sortBy 확인', () => {
        // given
        const list = [
            { id: '1', priority: 1 },
            { id: '5', priority: 5 },
            { id: '3', priority: 3 },
            { id: '2', priority: 2 },
            { id: '4', priority: 4 },
        ];

        // when
        const sortedList = _.sortBy(list, val => val.priority);

        // then
        let count = 1;
        sortedList.forEach(value => {
            expect(value.id).to.equals(count.toString());
            expect(value.priority).to.equals(count);
            count += 1;
        });
    });
});
