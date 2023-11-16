import { getWeather, getWeatherByWeek } from '../../api/api';

export default {
  namespaced: true,
  state() {
    return {
      weather: null
    };
  },
  actions: {
    async load({ commit, dispatch }, cards) {
      try {
        const weather = await Promise.all(
          cards.map(({ id }) => getWeather(id))
        );

        const weatherByWeek = await Promise.all(
          cards.map(({ id }) => getWeatherByWeek(id))
        );

        const prepearedWeather = weather.reduce((acc, res) => {
          acc[res.name] = {
            weather: res.main
          };

          return acc;
        }, {});

        const prepearedData = weatherByWeek.reduce((acc, res) => {
          acc[res.city.name] = {
            ...acc[res.city.name],
            weatherByWeek: res.list
          };

          return acc;
        }, prepearedWeather);

        commit('setData', prepearedData);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setData(state, data) {
      state.weather = {
        ...state.weather,
        ...data
      };
    }
  },
  getters: {
    get(state) {
      return state.weather;
    },
    isFavorites() {
      return router.currentRoute.value.path === '/favorites';
    }
  }
};
