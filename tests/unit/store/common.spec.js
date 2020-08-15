import { expect } from 'chai';
import commonModule from '@/store/modules/common.js';
import { CLOSE_SNACKBAR, OPEN_SNACKBAR, SNACKBAR_OPTIONS } from '@/store/type/common_type.js';

describe('mutations', () => {
    const { mutations } = commonModule;

    it('changeLoading 호출', () => {
        // given
        const state = {};

        // when & then
        mutations.changeLoading(state, true);
        expect(state.loading).to.be.true;

        mutations.changeLoading(state, false);
        expect(state.loading).to.be.false;

        mutations.changeLoading(state, '1');
        expect(state.loading).to.be.true;

        mutations.changeLoading(state);
        expect(state.loading).to.be.false;
    });

    it('openSnackBar 호출(snackBarOption 파라미터에 존재하지 않는 값은 디폴트 값으로 대체된다.)', () => {
        // given
        const state = {
            [SNACKBAR_OPTIONS]: {
                message: 'defaultMessage',
                open: false,
                color: 'defaultColor',
                location: 'defaultLocation',
            },
        };

        const snackBarOption = {
            message: 'newMessage',
        };

        // when
        mutations[OPEN_SNACKBAR](state, snackBarOption);

        // then
        expect(state[SNACKBAR_OPTIONS].message).to.be.equal('newMessage');
        expect(state[SNACKBAR_OPTIONS].open).to.be.true;
        expect(state[SNACKBAR_OPTIONS].color).to.be.equal('defaultColor');
        expect(state[SNACKBAR_OPTIONS].location).to.be.equal('defaultLocation');
    });

    it('openSnackBar 호출(snackBar.open = false로 호출하여도 항상 true로 변경된다.)', () => {
        // given
        const state = {
            [SNACKBAR_OPTIONS]: {
                message: 'defaultMessage',
                open: false,
                color: 'defaultColor',
                location: 'defaultLocation',
            },
        };

        const snackBarOptions = {
            message: 'newMessage',
            open: false,
        };

        // when
        mutations[OPEN_SNACKBAR](state, snackBarOptions);

        // then
        expect(state[SNACKBAR_OPTIONS].message).to.be.equal('newMessage');
        expect(state[SNACKBAR_OPTIONS].open).to.be.true;
        expect(state[SNACKBAR_OPTIONS].color).to.be.equal('defaultColor');
        expect(state[SNACKBAR_OPTIONS].location).to.be.equal('defaultLocation');
    });

    it('closeSnackBar 호출', () => {
        // given
        const state = {
            [SNACKBAR_OPTIONS]: {
                open: true,
            },
        };

        // when
        mutations[CLOSE_SNACKBAR](state);

        // then
        expect(state[SNACKBAR_OPTIONS].open).to.be.false;
    });
});
