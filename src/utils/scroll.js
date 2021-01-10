import goTo from 'vuetify/es5/services/goto';

class ScrollHelper {
    static scrollTo(position) {
        return goTo(position);
    }

    static scrollToTop() {
        return goTo(0);
    }

    static scrollToBottom() {
        return goTo(document.body.scrollHeight);
    }
}

export { ScrollHelper };
