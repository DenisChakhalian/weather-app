import { getCities } from '../../api/api';

export default {
  namespaced: true,
  state() {
    return {
      cities: []
    };
  },
  actions: {
    async load({ commit, dispatch }, lang) {
      try {
        const cities = await getCities(lang);

        commit('setData', cities);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setData(state, data) {
      state.cities = data;
    }
  },
  getters: {
    get(state) {
      return state.cities;
    }
  }
};
