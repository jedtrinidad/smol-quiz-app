import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useScoresStore = defineStore('scores', {
  state: () => {
    return {
      scores: useStorage('scores', [])
    }
  },
  actions: {
    addScore(entry) {
      this.scores.push(entry);
    }
  }
});