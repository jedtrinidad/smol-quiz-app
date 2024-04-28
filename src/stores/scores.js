import { useStorage, useDateFormat } from "@vueuse/core";
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
    },
    resetScores() {
      this.scores = []
    }
  },
  getters: {
    cookedScores: (state) => state.scores.map((e) => {
      return {
        score: e.score,
        amount: e.amount,
        timestamp: useDateFormat(new Date(e.timestamp), 'YYYY/MM/DD H:mm').value
      }
    })
  }
});