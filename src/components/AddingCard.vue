<template>
  <div class="card card-adding">
    <div class="card__header">
      <div @click.stop="">
        <div class="select">
          <input
            v-model="search"
            :placeholder="$t('cards.selectCity', locale)"
            @click="handleOpenList()"
            @input="handleOpenList()"
          >
        </div>

        <div
          ref="listRef"
          class="options"
          :class="{
            'options-closed': list?.id !== 'adding',
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
              @click="handleChangeCity(city.id)"
            />
          </template>
          <div
            v-if="!filterResult.length"
            v-t="{ path: 'cards.cityNotFound', locale }"
            class="option option-disebled"
          />
        </div>
      </div>

      <button
        class="button"
        :title="$t('cards.close', locale)"
        @click="handleCloseAdding()"
      >
        ❌
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    allowedCitiesId: {
      type: Array,
      default: () => []
    },
    cities: {
      type: Array
    }
  },
  setup() {
    const listRef = ref(null);
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);
    const list = computed(() => store.getters['list/get']);

    return {
      store,
      locale,
      list,
      listRef
    };
  },
  data() {
    return {
      isOpen: false,
      filteredCities: [],
      search: '',
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
  mounted() {
    window.scrollTo(0, document.body.scrollHeight + 500);
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
  },
  methods: {
    async handleChangeCity(id) {
      this.store.commit('selected/add', {
        id
      });
      this.store.commit('addCard/close');
      await this.store.dispatch('weather/load', [{ id }]);
    },
    handleCloseAdding() {
      this.store.commit('addCard/close');
    },
    handleOpenList() {
      if (this.list?.id !== 'adding') {
        this.store.commit('list/open', 'adding');
        window.addEventListener('click', this.handleCloseList);
      }
    },
    handleCloseList() {
      this.store.commit('list/close');
      window.removeEventListener('click', this.handleCloseList);
    }
  }
};
</script>
