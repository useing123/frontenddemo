<template>
  <div class="faq-section">
    <h2 class="text-3xl font-semibold mb-4 text-white">Frequently Asked Questions</h2>
    <ul class="faq-list">
      <faq-item
        class="mb-4"
        v-for="(item, index) in faqItems"
        :key="index"
        :question="item.question"
        :answer="item.answer"
        :isOpen="item.showAnswer"
        @toggle="toggleAnswer(index)"
      />
    </ul>
  </div>
</template>

<script>
import FaqItem from './FaqItem.vue';

export default {
  components: {
    FaqItem,
  },
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

<style scoped>
.faq-section {
  padding: 1rem;
  background-color: #141414;
}

.faq-section h2 {
  color: #ffffff;
  margin-bottom: 1rem;
}

.faq-list {
  list-style-type: none;
  padding-left: 0;
}

.faq-list .faq-item {
  border-bottom: 1px solid #303030;
  padding: 1rem 0;
  color: #b3b3b3;
  cursor: pointer;
}
</style>
