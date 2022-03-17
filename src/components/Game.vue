<script>
import { storeToRefs } from "pinia"
import { onBeforeUnmount, reactive, ref, watch } from "vue";
import API_URL, { endpoints } from "../constants";
import { useQuizStore } from "../stores/quiz";
import { useScoresStore } from "../stores/scores";

export default {
  async setup() {
    const quizStore = useQuizStore();
    const scoresStore = useScoresStore();
    const { categoryId, questionsAmount, score, isPlaying } = storeToRefs(quizStore);

    const questions = reactive([])
    const currentAnswer = ref(null);
    const currentQuestion = ref(null);
    const counter = ref(1);

    onBeforeUnmount(() => {
      questions.value = [];
      currentAnswer.value = null;
      currentQuestion.value = null;

      scoresStore.addScore({
        score: score.value, 
        amount: questionsAmount.value,
        category: categoryId.value, 
        timestamp: Date.now()
      });
      score.value = 0;
    });

    watch(questions, (newQuestions, oldQuestions) => {
      console.debug(newQuestions);
      console.debug(oldQuestions);
    });

    let shuffler = (arr, n) => {
      for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      return arr;
    };

    let getQuestions = async () => {
      try {
        let response = await fetch(`${API_URL}/${endpoints.QUIZ}?category=${categoryId.value}&amount=${questionsAmount.value}`)
        let { results } = await response.json();

        questions.value = results.map(prp => {
          let _temp = new Object();
          _temp.category = prp.category;
          _temp.question = prp.question;
          _temp.difficulty = prp.difficulty;
          _temp.correct_answer = prp.correct_answer;
          _temp.options = [...prp.incorrect_answers, prp.correct_answer]
          _temp.type = prp.type;

          _temp.options = shuffler(_temp.options, _temp.options.length);

          return _temp;
        })

        currentQuestion.value = questions.value.pop();
        currentAnswer.value = currentQuestion.value.options[0];
      } catch (error) {
        throw error;
      }
    };

    await getQuestions();

    const answerQuestion = () => {
      if (!questions.value.length) {
        isPlaying.value = false;
      }
      else {
        if (currentQuestion.value.correct_answer === currentAnswer.value) {
          score.value++;
        }

        currentQuestion.value = questions.value.pop();
        currentAnswer.value = currentQuestion.value.options[0];
        counter.value++;
      }
    };

    return { score, currentQuestion, currentAnswer, answerQuestion, counter }
  }
}
</script>

<template>
  <div class="nes-container with-title">
    <p class="title">[Question#{{ counter }}] Score:{{ score }}</p>
    <!-- Body -->
    <div>
      <div v-html="currentQuestion.question"></div>
      <ul class="answers-list">
        <li v-for="answer in currentQuestion.options">
          <label>
            <input
              type="radio"
              class="nes-radio"
              name="answer"
              id="answer"
              :value="answer"
              v-model="currentAnswer"
            />
            <span v-html="answer"></span>
          </label>
        </li>
      </ul>
      <button class="nes-btn" @click="answerQuestion">ANSWER</button>
    </div>
  </div>
</template>

<style scoped>
.nes-container {
  max-width: 600px;
}
.answers-list {
  list-style-type: none;
}
</style>