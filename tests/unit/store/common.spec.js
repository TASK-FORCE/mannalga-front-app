import { expect } from 'chai';
import commonModule from '@/store/modules/ui.ts';

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
            snackBarOptions: {
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
        mutations.openSnackBar(state, snackBarOption);

        // then
        expect(state.snackBarOptions.message).to.be.equal('newMessage');
        expect(state.snackBarOptions.open).to.be.true;
        expect(state.snackBarOptions.color).to.be.equal('defaultColor');
        expect(state.snackBarOptions.location).to.be.equal('defaultLocation');
    });

    it('openSnackBar 호출(snackBar.open = false로 호출하여도 항상 true로 변경된다.)', () => {
        // given
        const state = {
            snackBarOptions: {
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
        mutations.openSnackBar(state, snackBarOptions);

        // then
        expect(state.snackBarOptions.message).to.be.equal('newMessage');
        expect(state.snackBarOptions.open).to.be.true;
        expect(state.snackBarOptions.color).to.be.equal('defaultColor');
        expect(state.snackBarOptions.location).to.be.equal('defaultLocation');
    });

    it('closeSnackBar 호출', () => {
        // given
        const state = {
            snackBarOptions: {
                open: true,
            },
        };

        // when
        mutations.closeSnackBar(state);

        // then
        expect(state.snackBarOptions.open).to.be.false;
    });
});
