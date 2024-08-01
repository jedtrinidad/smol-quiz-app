<script setup>
import { storeToRefs } from 'pinia';
import { useQuizStore } from '../../stores/quiz';

const quizStore = useQuizStore();
const { questionsAmount } = storeToRefs(quizStore);
</script>

<template>
  <div class="nes-field">
    <label for="question-amount">Number of Questions</label>
    <input type="number" min="0" max="100" v-model="questionsAmount" id="question-amount" class="nes-input">
  </div>
</template>