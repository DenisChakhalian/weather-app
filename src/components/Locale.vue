<template>
  <div class="locale">
    <button
      v-t="{ path: 'translations.en', locale }"
      class="button"
      :class="{ 'button-active': locale === 'en' }"
      @click="handleChangeLocale('en')"
    />
    <button
      v-t="{ path: 'translations.ua', locale }"
      class="button"
      :class="{ 'button-active': locale === 'ua' }"
      @click="handleChangeLocale('ua')"
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

    return { store, locale };
  },
  methods: {
    handleChangeLocale(locale) {
      this.store.commit('locale/change', locale);
    }
  }
};
</script>
