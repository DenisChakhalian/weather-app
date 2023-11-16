<template>
  <img src="../../public/favicon.ico">
  <p
    v-t="{ path: 'app.name', locale }"
    class="app_name"
  />
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
