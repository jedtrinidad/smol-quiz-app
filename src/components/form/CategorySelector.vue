<script setup>
import { storeToRefs } from 'pinia';
import { useQuizStore } from '../../stores/quiz';

const quizStore = useQuizStore();
const { categoryId } = storeToRefs(quizStore);

const props = defineProps(['categories'])
</script>

<template>
  <div class="nes-field">
    <label for="category-selector">Select a Category</label>
    <div class="nes-select">
      <select name="category" id="category-selector" v-model="categoryId">
        <option v-for="(category, index) in categories" :value="category.id" :key="index">
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>
</template>