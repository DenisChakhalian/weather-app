export default {
  namespaced: true,
  state() {
    const list = null;

    return {
      list
    };
  },
  mutations: {
    open(state, id) {
      state.list = { id, isOpen: true };
    },
    close(state) {
      state.list = null;
    }
  },
  getters: {
    get(state) {
      return state.list;
    }
  }
};
