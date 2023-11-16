const KEY = 'locale';

export default {
  namespaced: true,
  state() {
    let locale = JSON.parse(localStorage.getItem(KEY));

    if (!locale) {
      locale = 'en';
    }

    localStorage.setItem(KEY, JSON.stringify(locale));

    return {
      locale
    };
  },
  mutations: {
    change(state, locale) {
      state.locale = locale;
      localStorage.setItem(KEY, JSON.stringify(locale));
    }
  },
  getters: {
    get(state) {
      return state.locale;
    }
  }
};
