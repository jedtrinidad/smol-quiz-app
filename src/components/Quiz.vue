<script>
import { storeToRefs } from "pinia";
import { useQuizStore } from "../stores/quiz"
import API_URL, { endpoints } from '../constants';
import { ref } from "vue";

export default {
  async setup() {
    const quizStore = useQuizStore();
    const { isPlaying, categoryId } = storeToRefs(quizStore);

    const questions = ref([]);

    quizStore.$subscribe((mutation) => {
      console.log(mutation)
    });

    return {
      isPlaying
    }
  }
}
</script>

<template>
  <div class="nes-container with-title" v-if="isPlaying">
    <p class="title">Question # 1</p>
  </div>
</template>

<style scoped>
.nes-container {
  margin-top: 100px;
}
</style>