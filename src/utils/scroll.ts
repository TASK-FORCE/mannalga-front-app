import goTo from 'vuetify/es5/services/goto';

class ScrollHelper {
  static scrollTo(position: number) {
    goTo(position);
  }

  static scrollToTop() {
    goTo(0);
  }

  static scrollToBottom() {
    goTo(document.body.scrollHeight);
  }
}

export { ScrollHelper };
