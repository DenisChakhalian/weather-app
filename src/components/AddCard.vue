<template>
  <button
    v-if="!(isFavorites || cardsLength >= 5)"
    id="add"
    v-t="{ path: 'cards.addCard', locale }"
    class="button"
    @click="handleAdd(store)"
  />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);
    const isFavorites = computed(() => store.getters['addCard/isFavorites']);
    const selectFrom = isFavorites.value ? 'favorites' : 'selected';
    const cardsLength = computed(
      () => store.getters[`${selectFrom}/get`].length
    );

    return {
      isFavorites,
      store,
      cardsLength,
      locale
    };
  },
  methods: {
    handleAdd(store) {
      store.commit('addCard/open');
    }
  }
};
</script>
