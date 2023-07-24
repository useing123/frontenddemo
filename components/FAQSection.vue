<template>
    <div class="faq-section mt-8">
      <h2 class="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <ul class="faq-list">
        <li
          class="mb-2 cursor-pointer"
          v-for="(question, index) in faqItems"
          :key="index"
          @click="toggleAnswer(index)"
        >
          <p :class="question.showAnswer ? 'text-gray-300' : 'text-white'">
            {{ question.question }}
          </p>
          <div v-if="question.showAnswer" class="text-gray-300 mt-2">
            {{ question.answer }}
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        faqItems: [
          {
            question: 'FAQ item 1',
            answer: 'Answer to FAQ item 1.',
            showAnswer: false,
          },
          {
            question: 'FAQ item 2',
            answer: 'Answer to FAQ item 2.',
            showAnswer: false,
          },
          {
            question: 'FAQ item 3',
            answer: 'Answer to FAQ item 3.',
            showAnswer: false,
          },
        ],
      };
    },
    methods: {
      toggleAnswer(index) {
        this.faqItems[index].showAnswer = !this.faqItems[index].showAnswer;
      },
    },
  };
  </script>
  
  <style>
  .faq-item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .answer {
    margin-left: 22px;
  }
  </style>
  