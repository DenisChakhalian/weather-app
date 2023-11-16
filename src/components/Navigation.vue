<template>
  <div class="navigation">
    <router-link
      v-t="{ path: 'navigation.main', locale }"
      class="navigation__item"
      to="/"
    />
    <router-link
      v-t="{ path: 'navigation.favorites', locale }"
      class="navigation__item"
      to="/favorites"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);

    return {
      locale
    };
  }
};
</script>
