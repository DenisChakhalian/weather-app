<template>
  <div
    v-if="!loading"
    class="cards"
  >
    <template
      v-for="card in type === 'favorites' ? favorites : selected"
      :key="card.id"
    >
      <Card
        :card="card"
        :is-favorite="favoritesIds.includes(card.id)"
        :allowed-cities-id="allowedCitiesId"
        :weather="weather[card.id]"
      />
    </template>

    <AddingCard
      v-if="isAdding"
      :allowed-cities-id="allowedCitiesId"
    />
    <div
      v-if="!isCards && !isAdding"
      v-t="{ path: 'cards.addSome', locale }"
      class="card card-no_cards"
    />
  </div>
  <Loader v-else-if="loading" />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import AddingCard from './AddingCard.vue';
import Loader from './Loader.vue';

export default {
  components: { Card, AddingCard, Loader },
  props: {
    type: {
      type: String,
      default: () => ''
    }
  },
  setup(props) {
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);
    const favorites = computed(() => store.getters['favorites/get']);
    const selected = computed(() => store.getters['selected/get']);
    const favoritesIds = computed(() => favorites.value.map(({ id }) => id));
    const isAdding = computed(() => store.getters['addCard/get']);
    const allowedCitiesId = computed(
      () => store.getters[`${props.type}/allowedCitiesId`]
    );
    const loading = ref(true);
    const isCards = computed(() =>
      props.type === 'favorites'
        ? !!favorites.value.length
        : !!selected.value.length
    );

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('weather/load', [
        ...favorites.value,
        ...selected.value
      ]);
      loading.value = false;
    });

    const weather = computed(() => store.getters['weather/get']);

    return {
      favoritesIds,
      store,
      isAdding,
      allowedCitiesId,
      weather,
      loading,
      favorites,
      selected,
      isCards,
      locale
    };
  },
  updated() {
    if (this.type === 'favorites') {
      this.store.commit('addCard/close');
    }
  }
};
</script>
