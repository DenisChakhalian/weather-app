export default {
  namespaced: true,
  state() {
    return {
      modal: {
        isVisible: false,
        type: '',
        cardId: ''
      }
    };
  },
  mutations: {
    open(state, { type, cardId }) {
      state.modal = {
        isVisible: true,
        type,
        cardId
      };
    },
    close(state) {
      state.modal = {
        isVisible: false,
        type: '',
        cardId: ''
      };
    }
  },
  getters: {
    get(state) {
      return state.modal;
    }
  }
};
