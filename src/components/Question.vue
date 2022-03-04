<script>
export default {
  props: ['questionObject']
}
</script>

<template>
  <p v-if="questionObject !== null">{{ questionObject.question }}</p>
  <p v-else>Waiting for Question...</p>
</template>