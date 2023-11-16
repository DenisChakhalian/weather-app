<template>
  <Header />
  <div class="content">
    <div class="content__options">
      <Navigation />
      <Locale />
    </div>
    <router-view />
  </div>
  <AddCard />
  <Modal
    v-if="modal.isVisible"
    :modal="modal"
  />
</template>

<script setup>
import Header from './components/Header.vue';
import AddCard from './components/AddCard.vue';
import Navigation from './components/Navigation.vue';
import Modal from './components/Modal.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Locale from './components/Locale.vue';

const store = useStore();
const modal = computed(() => store.getters['modal/get']);
</script>
