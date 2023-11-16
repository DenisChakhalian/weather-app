<template>
  <div
    class="card"
    :class="{ 'card-favorite': isFavorite }"
  >
    <div class="card__header">
      <select
        class="select"
        name="Cities"
        autocomplete="on"
        :disabled="isFavorites"
        @change="handleChangeCity($event, card.id)"
      >
        <option
          v-t="{ path: 'cards.selectCity', locale }"
          class="option"
          value="0"
          selected
          disabled
        />

        <template
          v-for="city in cities"
          :key="city.id"
        >
          <option
            v-t="{ path: `cities.${city.name}`, locale }"
            class="option"
            :value="city.id"
            :selected="card.name === city.name"
            :disabled="!allowedCitiesId.includes(city.id)"
          />
        </template>
      </select>
      <div>
        <button
          v-if="isFavorite"
          class="button"
          title="Remove from favorite"
          @click="handleRemoveFavorite(card.id)"
        >
          🩶
        </button>

        <button
          v-else
          class="button"
          title="To favorite"
          @click="handleToFavorite(card)"
        >
          ❤️
        </button>

        <button
          v-if="!isFavorites"
          class="card__button-delete button"
          title="Remove"
          @click="handleRemoveSelected(card.id)"
        >
          ❌
        </button>
      </div>
    </div>

    <div class="card__by-option">
      <button
        v-t="{ path: 'cards.byDay', locale }"
        class="button"
        :class="{ 'button-active': weatherType === 'weather' }"
        @click="handleChangeWeatherType('weather')"
      />
      <button
        v-t="{ path: 'cards.byWeek', locale }"
        class="button"
        :class="{ 'button-active': weatherType === 'weatherByWeek' }"
        @click="handleChangeWeatherType('weatherByWeek')"
      />
    </div>

    <div
      v-if="weather"
      class="weather"
    >
      <Chart
        :id="card.id"
        :weather="weather[weatherType]"
      />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import cities from '../constants/cities';
import { computed, onMounted, ref } from 'vue';
import { getWeather } from '../api/api';
import Chart from './Chart.vue';
import Loader from './Loader.vue';

export default {
  components: {
    Chart,
    Loader
  },
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    isFavorite: {
      type: Boolean,
      default: () => false
    },
    allowedCitiesId: {
      type: Array,
      default: () => []
    },
    weather: {
      type: Object
    }
  },
  setup() {
    const weatherType = ref('weather');
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);
    const isFavorites = computed(() => store.getters['addCard/isFavorites']);

    const handleChangeWeatherType = type => {
      weatherType.value = type;
    };

    return {
      store,
      cities,
      isFavorites,
      weatherType,
      handleChangeWeatherType,
      locale
    };
  },
  methods: {
    async handleChangeCity(event, id) {
      this.store.commit('selected/update', {
        idFrom: id,
        cityTo: { id: event.target.value, name: event.target.value }
      });
      await this.store.dispatch('weather/load', [
        { id: event.target.value, name: event.target.value }
      ]);
    },
    handleRemoveFavorite(id) {
      this.store.commit('favorites/remove', id);
    },
    handleToFavorite(card) {
      const favoritesLength = this.store.getters['favorites/get'].length;

      if (favoritesLength < 5) {
        this.store.commit('favorites/add', card);
      } else {
        this.store.commit('modal/open', {
          type: 'exaggerated'
        });
      }
    },
    handleRemoveSelected(id) {
      this.store.commit('modal/open', {
        type: 'delete',
        cardId: id
      });
    }
  }
};
</script>
