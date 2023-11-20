<template>
  <div
    class="card"
    :class="{ 'card-favorite': isFavorite }"
  >
    <div class="card__header">
      <div @click.stop="">
        <div class="select">
          <input
            v-model="search"
            :disabled="isFavorites"
            @click="handleOpenList()"
            @input="handleOpenList()"
          >
        </div>

        <div
          ref="listRef"
          class="options"
          :class="{
            'options-closed': list?.id !== card.id,
            'options-reversed': isReverse
          }"
        >
          <template
            v-for="city in filterResult"
            :key="city.id"
          >
            <div
              v-t="{ path: `cities.${city.id}`, locale }"
              class="option"
              :class="{ 'option-disebled': !allowedCitiesId.includes(city.id) }"
              @click="handleChangeCity(city, card.id)"
            />
          </template>
          <div
            v-if="!filterResult.length"
            v-t="{ path: `cards.cityNotFound`, locale }"
            class="option option-disebled"
          />
        </div>
      </div>

      <div>
        <button
          v-if="isFavorite"
          class="button"
          :title="$t('cards.removeFavorite', locale)"
          @click="handleRemoveFavorite(card.id)"
        >
          ❤️
        </button>

        <button
          v-else
          class="button"
          :title="$t('cards.toFavorite', locale)"
          @click="handleToFavorite(card.id)"
        >
          🩶
        </button>

        <button
          v-if="!isFavorites"
          class="card__button-delete button"
          :title="$t('cards.remove', locale)"
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
        :locale="locale"
      />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
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
    },
    cities: {
      type: Array
    }
  },
  setup() {
    const listRef = ref(null);
    const weatherType = ref('weather');
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);
    const isFavorites = computed(() => store.getters['addCard/isFavorites']);
    const list = computed(() => store.getters['list/get']);


    const handleChangeWeatherType = type => {
      weatherType.value = type;
    };

    return {
      store,
      isFavorites,
      weatherType,
      handleChangeWeatherType,
      locale,
      list,
      listRef
    };
  },
  data() {
    return {
      isOpen: false,
      filteredCities: [],
      search: this.$t(`cities.${this.card.id}`, this.locale),
      prevLocale: this.locale,
      isReverse: false
    };
  },
  computed: {
    filterResult() {
      this.filteredCities = this.cities.filter(city => {
        return (
          city.name.toLowerCase().indexOf(this.search.toLowerCase().trim()) > -1
        );
      });

      if (this.isReverse) {
        this.filteredCities.reverse();
      }

      return this.filteredCities;
    }
  },
  updated() {
    if (
      this.list &&
      this.list.isOpen &&
      this.listRef.getBoundingClientRect().bottom >
        document.documentElement.clientHeight
    ) {
      this.isReverse = true;
    }

    if (this.isReverse && !this.list) {
      this.isReverse = false;
      this.filteredCities.reverse();
    }

    if (this.prevLocale !== this.locale && this.$t) {
      this.search = this.$t(`cities.${this.card.id}`, this.locale);
      this.prevLocale = this.locale;
    }
  },
  methods: {
    handleOpenList() {
      if (this.list?.id !== this.card.id) {
        this.store.commit('list/open', this.card.id);
        window.addEventListener('click', this.handleCloseList);
      }
    },
    handleCloseList() {
      this.store.commit('list/close');
      window.removeEventListener('click', this.handleCloseList);
      this.search = this.$t ? this.$t(`cities.${this.card.id}`, this.locale) : '';
    },
    async handleChangeCity(city, id) {
      this.store.commit('selected/update', {
        idFrom: id,
        cityTo: { id: city.id }
      });
      await this.store.dispatch('weather/load', [city]);
    },
    handleRemoveFavorite(id) {
      this.store.commit('favorites/remove', id);
    },
    handleToFavorite(id) {
      const favoritesLength = this.store.getters['favorites/get'].length;

      if (favoritesLength < 5) {
        this.store.commit('favorites/add', { id });
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
