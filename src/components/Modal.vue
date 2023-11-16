<template>
  <div class="modal">
    <div class="modal__block">
      <div class="modal__content">
        <p
          v-t="{
            path: `modal.${
              modal.type === 'delete' ? 'deleteSelected' : 'maxFavorites'
            }`,
            locale
          }"
        />
        <div class="modal__buttons">
          <template v-if="modal.type === 'delete'">
            <button
              v-t="{ path: 'modal.button.yes', locale }"
              class="button"
              @click="handleDelete()"
            />
            <button
              v-t="{ path: 'modal.button.no', locale }"
              class="button"
              @click="handleCloseModal()"
            />
          </template>
          <template v-if="modal.type === 'exaggerated'">
            <button
              v-t="{ path: 'modal.button.ok', locale }"
              class="button"
              @click="handleCloseModal()"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    modal: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const store = useStore();
    const locale = computed(() => store.getters['locale/get']);

    return {
      store,
      locale
    };
  },
  methods: {
    handleDelete() {
      this.store.commit('selected/remove', this.modal.cardId);
      this.store.commit('modal/close');
    },
    handleCloseModal() {
      this.store.commit('modal/close');
    }
  }
};
</script>
