import { defineStore } from "pinia";

export const useQuizStore = defineStore('quiz', {
  state: () => {
    return {
      categoryId: 9,
      isPlaying: false,
      questions: []
    }
  }
});