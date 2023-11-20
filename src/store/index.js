import { createStore } from 'vuex';
import selected from './modules/selected.module';
import favorites from './modules/favorites.module';
import addCard from './modules/addCard.module';
import weather from './modules/weather.module';
import modal from './modules/modal.module';
import locale from './modules/locale.module';
import list from './modules/list.module';
import cities from './modules/cities.module';

export default createStore({
  modules: {
    selected,
    favorites,
    addCard,
    weather,
    modal,
    locale,
    list,
    cities
  }
});
