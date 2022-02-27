<script setup>
import API_URL, { endpoints } from '../constants';

const { trivia_categories } = await fetch(`${API_URL}/${endpoints.CATEGORY}`)
  .then(data => {
    return data.json()
  })
  .catch(e => {
    throw e
  })
</script>

<template>
  <div id="selector-window" class="nes-container with-title">
    <p class="title">Select Category</p>
    <div class="nes-select">
      <select id="category-selector">
        <option v-for="(category, index) in trivia_categories" :value="category.id" :key="index">
        {{ category.name }}
        </option>
      </select>
    </div>
    <button class="nes-btn is-primary">PLAY</button>
  </div>
</template>

<style scoped>
.nes-container {
  text-align: start;
  margin-top: 8em;
}
.nes-select {
  margin-bottom: 20px;
}
</style>