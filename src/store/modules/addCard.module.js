import router from '@/router';

export default {
  namespaced: true,
  state() {
    const isAddCard = false;

    return {
      isAddCard
    };
  },
  mutations: {
    open(state) {
      state.isAddCard = true;
    },
    close(state) {
      state.isAddCard = false;
    }
  },
  getters: {
    get(state) {
      return state.isAddCard;
    },
    isFavorites() {
      return router.currentRoute.value.path === '/favorites';
    }
  }
};
