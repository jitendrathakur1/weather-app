<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const { placeholder, keypressHanlder } = defineProps(['placeholder', 'keypressHanlder'])
const emits = defineEmits()

const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    // Emit the location value to the parent component
    emits('keypressHanlder', event)
  }
}
</script>

<template>
  <section class="search-box" data-test="search">
    <input
      type="text"
      name="search"
      id="search"
      class="search-box__search-bar"
      :placeholder="placeholder"
      @keypress="handleKeypress"
    />
  </section>
</template>

<style scoped>
.search-box {
  width: 100%;
  margin-bottom: 30px;
  margin: var(--margin-auto);
}

.search-box__search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: var(--main-text-color);
  font-size: 20px;
  appearance: none;
  border: none;
  outline: none;
  box-shadow: var(--box-shadow-1);
  border-radius: var(--box-radius) var(--box-radius) 0 0;
  transition: var(--transition-duration);
}

.search-box__search-bar:focus {
  box-shadow: var(--box-shadow-2);
}
</style>
