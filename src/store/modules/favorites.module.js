import cities from '../../constants/cities';

const KEY = 'favorites';

export default {
  namespaced: true,
  state() {
    let favorites = JSON.parse(localStorage.getItem(KEY));

    if (!favorites) {
      favorites = [
        {
          id: 'Kharkiv',
          name: 'Kharkiv'
        }
      ];
    }

    localStorage.setItem(KEY, JSON.stringify(favorites));

    return {
      favorites
    };
  },
  mutations: {
    add(state, favorite) {
      const newFavorites = [...state.favorites, favorite];
      state.favorites = newFavorites;
      localStorage.setItem(KEY, JSON.stringify(newFavorites));
    },
    update(state, { idFrom, cityTo }) {
      const newFavorites = state.favorites.map(el =>
        el.id === idFrom ? cityTo : el
      );
      state.favorites = newFavorites;
      localStorage.setItem(KEY, JSON.stringify(newFavorites));
    },
    remove(state, favoriteId) {
      const newFavorites = state.favorites.filter(
        ({ id }) => id !== favoriteId
      );
      state.favorites = newFavorites;
      localStorage.setItem(KEY, JSON.stringify(newFavorites));
    }
  },
  getters: {
    get(state) {
      return state.favorites;
    },
    allowedCitiesId(state) {
      const ids = state.favorites.map(({ id }) => id);
      return cities.map(({ id }) => id).filter(id => !ids.includes(id));
    }
  }
};
