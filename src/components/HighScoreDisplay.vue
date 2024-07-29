<template>
  <div v-if="scores.length > 0">
    <div class="nes-table-responsive">
      <table class="nes-table is-centered is-bordered">
        <thead>
          <th>Score</th>
          <th>Time</th>
        </thead>
        <tbody>
          <tr v-for="score in scores">
            <td>{{ score.score }}/{{ score.amount }} Correct</td>
            <td>{{ score.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <p>No scores recorded</p>
  </div>
</template>

<script setup>
const props = defineProps({
  scores: Array
})
</script>