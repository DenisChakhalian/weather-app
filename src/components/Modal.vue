<template>
  <div
    class="modal"
    @click="handleCloseModal()"
  >
    <div
      class="modal__block"
      @click.stop=""
    >
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

    document.documentElement.style.overflow = 'hidden';

    return {
      store,
      locale
    };
  },
  mounted() {
    window.addEventListener('keyup', this.onEscCloseModal);
    window.addEventListener('keyup', this.onEnterSubmitModal);
  },
  unmounted() {
    window.removeEventListener('keyup', this.onEscCloseModal);
    window.removeEventListener('keyup', this.onEnterSubmitModal);
  },
  methods: {
    onEscCloseModal(event) {
      if (event.key === 'Escape') {
        this.handleCloseModal();
      }
    },
    onEnterSubmitModal(event) {
      if (event.key === 'Enter') {
        this.handleDelete();
      }
    },
    handleDelete() {
      this.store.commit('selected/remove', this.modal.cardId);
      document.documentElement.style.overflow = 'auto';
      this.store.commit('modal/close');
    },
    handleCloseModal() {
      document.documentElement.style.overflow = 'auto';
      this.store.commit('modal/close');
    }
  }
};
</script>
