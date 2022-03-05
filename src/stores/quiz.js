import { defineStore } from "pinia";

export const useQuizStore = defineStore('quiz', {
  state: () => {
    return {
      categoryId: 9,
      questionsAmount: 10,
      isPlaying: false,
    }
  }
});