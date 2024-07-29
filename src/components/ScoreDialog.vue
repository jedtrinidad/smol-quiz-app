<script setup>
import { ref } from 'vue';
import HighScoreDisplay from './HighScoreDisplay.vue';
import { useScoresStore } from '../stores/scores';
import { storeToRefs } from 'pinia';

const dialog = ref(null);

const openDialog = () => {
  dialog.value.showModal();
}

const scoresStore = useScoresStore();
const { cookedScores } = storeToRefs(scoresStore);
</script>

<template>
  <button class="nes-btn is-primary" @click="openDialog">SHOW SCORES</button>
  <Teleport to="body">
    <section>
      <dialog class="nes-dialog" ref="dialog">
        <form method="dialog">
          <p class="title">Scores</p>
          <HighScoreDisplay :scores="cookedScores" />
          <menu class="dialog-menu">
            <button class="nes-btn">Close</button>
            <button class="nes-btn is-error" @click="scoresStore.resetScores" .disabled="cookedScores.length < 0">Reset</button>
          </menu>
        </form>
      </dialog>
    </section>
  </Teleport>
</template>