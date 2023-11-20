import { useStore } from 'vuex';

const KEY = 'selected';

export default {
  namespaced: true,
  state() {
    let selected = JSON.parse(localStorage.getItem(KEY));

    if (!selected) {
      selected = [
        {
          id: 'Kharkiv'
        }
      ];
    }

    localStorage.setItem(KEY, JSON.stringify(selected));

    return {
      selected
    };
  },
  mutations: {
    add(state, selected) {
      const newSelected = [...state.selected, selected];
      state.selected = newSelected;
      localStorage.setItem(KEY, JSON.stringify(newSelected));
    },
    update(state, { idFrom, cityTo }) {
      const newSelected = state.selected.map(el =>
        el.id === idFrom ? cityTo : el
      );
      state.selected = newSelected;
      localStorage.setItem(KEY, JSON.stringify(newSelected));
    },
    remove(state, selectedId) {
      const newSelected = state.selected.filter(({ id }) => id !== selectedId);
      state.selected = newSelected;
      localStorage.setItem(KEY, JSON.stringify(newSelected));
    }
  },
  getters: {
    get(state) {
      return state.selected;
    },
    allowedCitiesId(state) {
      const store = useStore();

      const ids = state.selected.map(({ id }) => id);
      const cities = store.getters['cities/get'];

      return cities.map(({ id }) => id).filter(id => !ids.includes(id));
    }
  }
};
