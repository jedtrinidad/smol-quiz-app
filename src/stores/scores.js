import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useScoresStore = defineStore('scores', {
  state: () => {
    return {
      scores: useStorage('scores', [])
    }
  },
  actions: {
    addScore() {
      this.scores.push(entry);
    }
  },
  getters: {
    cookedScores: (state) => state.scores.map((e) => {
      return {
        score: e.score,
        amount: e.amount,
        timestamp: new Date(e.timestamp)
      }
    })
  }
});