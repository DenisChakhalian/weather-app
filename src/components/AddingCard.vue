<template>
  <div class="card card-adding">
    <div class="card__header">
      <select
        class="select"
        name="Cities"
        autocomplete="on"
        @change="handleChangeCity($event)"
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
            :disabled="!allowedCitiesId.includes(city.id)"
          />
        </template>
      </select>

      <button
        class="button"
        title="Close"
        @click="handleCloseAdding()"
      >
        ❌
      </button>
    </div>
  </div>
</template>

<script>
import cities from '../constants/cities';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    allowedCitiesId: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);
    const isAdding = computed(() => store.getters['addCard/get']);

    return {
      cities,
      store,
      isAdding,
      locale
    };
  },
  mounted() {
    window.scrollTo(0, document.body.scrollHeight + 500);
  },
  methods: {
    async handleChangeCity(event) {
      this.store.commit('selected/add', {
        id: event.target.value,
        name: event.target.value
      });
      this.store.commit('addCard/close');
      await this.store.dispatch('weather/load', [
        { id: event.target.value, name: event.target.value }
      ]);
    },
    handleCloseAdding() {
      this.store.commit('addCard/close');
    }
  }
};
</script>
